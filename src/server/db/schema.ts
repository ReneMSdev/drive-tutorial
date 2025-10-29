import "server-only"

import {
  int,
  bigint,
  text,
  index,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core"

export const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`,
)

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name"),
    url: text("url"),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    size: int("size"),
  },
  (t) => {
    return [index("parent_index").on(t.parent)]
  },
)

export type DB_FileType = typeof files_table.$inferSelect

export const folders = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)]
  },
)

export type DB_FolderType = typeof folders.$inferSelect
