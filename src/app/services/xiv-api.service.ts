import {Service, inject, Signal} from '@angular/core';
import {FISH_CONFIG} from '../shared/fish-config';
import {HttpClient, httpResource} from '@angular/common/http';
import {catchError, Observable, of, retry} from 'rxjs';
import {Fish} from '../shared/models/fish';

@Service()
export class XivApiService {

  private http = inject(HttpClient);
  private config = inject(FISH_CONFIG)
  private url = `${this.config.apiBaseUrl}/sheet/FishParameter`;

  // private contentResource = httpResource<{ rows: [] }>(() => ({
  //   url: `${this.config.apiBaseUrl}/sheet/FishParameter`,
  //   params: { limit: 10 },
  // }), { defaultValue: { rows: [] } });
  //
  // // Remember to get all the parts of information separately
  // // Rather than one large complex query
  //
  // private contents = this.contentResource.value; // Writable, replaces signal()
  // contentList = computed(() =>
  // this.contentResource.error() ? [] : this.contents());
  // isLoading = this.contentResource.isLoading;
  // error = this.contentResource.error;

  search(query: string, perPage = 10) : Observable<Fish[]> {
    return this.http.get<Fish[]>(`${this.url}/search`, {
      params: { query, per_page: perPage },
    });
  }

  getById(id: string) : Observable<Fish | null> {
    return this.http.get<Fish>(`${this.url}/${id}`).pipe(
      retry(2),
      catchError(() => of(null)),
    );
  }

  byId(id: Signal<string>) {
    return httpResource<Fish>(() => `${this.url}/${id()}`);
  }

  byIds(ids: Signal<string[]>) {
    return httpResource<Fish[]>(() => ids().length
      ? { url: this.url, params: { by_ids: ids().join(',') } }
      : undefined,
    { defaultValue: [] });
  }
}
