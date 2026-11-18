// export interface Fish2 {
//   schema: string;
//   version: string;
//   rows: Row[];
// }
//
// export interface Row {
//   row_id: number;
//   fields: RowFields;
// }
//
// export interface RowFields {
//   Item: Item;
// }
//
// export interface Item {
//   value: number;
//   sheet: "Item";
//   row_id: number;
//   fields: ItemFields;
// }
//
// export interface ItemFields {
//   Name: string;
// }



export interface Fish {
  id: number;
  name: string;
  description: string;
  location: string;
  icon: string; // May remove soon
}

/*
Old version
export interface Fish {
  id: number;
  name: string;
  location: string;
  weather?: string;
  time?: string;
}
*/
