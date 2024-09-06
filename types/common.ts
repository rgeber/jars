import {RecordId} from "surrealdb.js";
import {z} from "zod";

export const recordIdSchema = z.instanceof(RecordId)