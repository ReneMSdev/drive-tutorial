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

export const files = createTable(
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
