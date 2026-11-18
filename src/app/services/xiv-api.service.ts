import { Service, inject, Signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { FISH_CONFIG } from '../shared/fish-config';
import { Fish } from '../shared/models/fish';

@Service()
export class XivApiService {
  private http = inject(HttpClient);
  private config = inject(FISH_CONFIG);

  private sheetUrl = `${this.config.apiBaseUrl}/sheet/FishParameter`;
  private searchUrl = `${this.config.apiBaseUrl}/search`;

  /**
   * Only ask for the fields we actually use. Without this the API sends back
   * the whole row and it gets big fast.
   */
  private fields = 'Item.Name,Item.Icon,Text,FishingSpot.PlaceName.Name';

  /**
   * Searches fish by name
   *
   * wants unique query syntax (`Item.Name~"kelp"`)
   * so we build that here so callers don't have to care about it.
   */
  search(query: string, limit = 10): Observable<Fish[]> {
    //Double quotes would break the query string, so just drop them
    const cleaned = query.replace(/"/g, '').trim();

    return this.http
      .get<XivSearchResponse>(this.searchUrl, {
        params: {
          sheets: 'FishParameter',
          query: `Item.Name~"${cleaned}"`,
          fields: this.fields,
          limit,
        },
      })
      .pipe(
        map((res) => res.results.map((r) => this.toFish(r))),
        catchError(() => of([])),
      );
  }

  /**
   * Signal version of getById, for use in components with httpResource.
   * Re-fetches on its own whenever the id signal changes
   */
  byId(id: Signal<number | string>) {
    return httpResource(
      () => ({ url: `${this.sheetUrl}/${id()}`, params: { fields: this.fields } }),
      { parse: (raw) => this.toFish(raw as XivRow) },
    );
  }

  /**
   * Loads a bunch of fish at once. The param is called `rows` on xivapi
   */
  byIds(ids: Signal<(number | string)[]>) {
    return httpResource(
      () =>
        ids().length
          ? { url: this.sheetUrl, params: { rows: ids().join(','), fields: this.fields } }
          : undefined,
      {
        parse: (raw) => (raw as XivSheetResponse).rows.map((r) => this.toFish(r)),
        defaultValue: [] as Fish[],
      },
    );
  }

  /**
   * Grabs the first page of fish from the sheet, for the main list.
   *
   * Row 0 is a blank placeholder in the game data (no name), so anything
   * without a name gets filtered out here
   */
  list(limit = 30) {
    return httpResource(
      () =>
        ({ url: this.sheetUrl, params: { limit, fields: this.fields } }),
      {
        parse: (raw) =>
          (raw as XivSheetResponse).rows.map
          ((r) => this.toFish(r))
            .filter((f) => f.name),
        defaultValue: [] as Fish[],
      },
    );
  }

  /**
   * Flattens one xivapi row into a Fish.
   */
  private toFish(row: XivRow): Fish {
    const f = row.fields;
    const iconPath = f.Item?.fields?.Icon?.path;

    return {
      id: row.row_id,
      name: f.Item?.fields?.Name ?? '',
      description: f.Text ?? '',
      location: f.FishingSpot?.fields?.PlaceName?.fields?.Name ?? '',
      icon: iconPath ? `${this.config.apiBaseUrl}/asset?path=${iconPath}&format=png` : '',
    };
  }
}

/**
 * What xivapi actually sends back
 */
interface XivRow {
  row_id: number;
  fields: {
    Text?: string;
    Item?: {
      row_id: number;
      fields?: {
        Name?: string;
        Icon?: { id: number; path: string };
      };
    };
    FishingSpot?: {
      row_id: number;
      fields?: {
        PlaceName?: { row_id: number; fields?: { Name?: string } };
      };
    };
  };
}

/** Response from /sheet/FishParameter (a list of rows). */
interface XivSheetResponse {
  schema: string;
  version: string;
  rows: XivRow[];
}

/** Response from /search next is a cursor for the next page if we ever need it. */
interface XivSearchResponse {
  next?: string;
  schema: string;
  version: string;
  results: (XivRow & { score: number; sheet: string })[];
}


