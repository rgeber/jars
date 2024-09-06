import {z} from "zod";
import {recordIdSchema} from "~/types/common";


export const jarSchema = z.object({
  id: recordIdSchema,
  title: z.string().min(1).max(127),
  creationDate: z.date(),
  owner: recordIdSchema
})

export type Jar = z.infer<typeof jarSchema> & {kind: 'Jar'}