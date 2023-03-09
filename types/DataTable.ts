import type { DataTableHeader } from 'vuetify/types'

export type TypeField =
  | 'boolean'
  | 'datetime'
  | 'string'
  | 'list'
  | 'collection'
  | 'translate'

export interface IDataTableHeader extends DataTableHeader {
  readonly type?: TypeField
  readonly property?: string
  readonly collectionPath?: string
  readonly link?: { route: string; param?: string }
}

export interface IDataTableCell {
  params: object
  propertyType: string
  // readonly type?: TypeField
  path?: string
  collectionPath?: string
  link?: { route: string; param?: string }
}

export interface IDataTableField {
  readonly type: TypeField
  readonly text?: string
  readonly value?: string
  readonly property: string
  // readonly sortable?: boolean
  // readonly path?: string
  // readonly collectionPath?: string
  // readonly link?: { route: string; param?: string }
  // readonly params?: object
}
