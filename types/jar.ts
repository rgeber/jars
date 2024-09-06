import {RecordId} from 'surrealdb.js'

export type Jar = {
  id: string | RecordId;
  title: string;
  creation_date: Date;
}