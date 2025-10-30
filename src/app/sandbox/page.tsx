import { db } from "~/server/db"
import { folders_table } from "~/server/db/schema"
import { auth } from "@clerk/nextjs/server"
import { mockFolders } from "../../lib/mock-data"
import { eq } from "drizzle-orm"

export default async function SandboxPage() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("User not found")
  }

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, userId))

  console.log(folders)

  return (
    <div>
      <form
        action={async () => {
          "use server"
          const { userId } = await auth()
          if (!userId) {
            throw new Error("User not found")
          }

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: userId,
              parent: null,
            })
            .$returningId()

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: userId,
            parent: rootFolder[0]!.id,
          }))
          await db.insert(folders_table).values(insertableFolders)
        }}
      >
        <button type="submit">Create file</button>
      </form>
    </div>
  )
}
