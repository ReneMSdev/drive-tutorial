import { db } from "~/server/db"
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema"
import DriveContents from "~/app/drive-contents"

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>
}) {
  const params = await props.params

  const parsedFolderId = parseInt(params.folderId)

  if (isNaN(parsedFolderId)) {
    console.log(params.folderId)
    return <div>Invalid folder ID</div>
  }

  const files = await db.select().from(filesSchema)
  const folders = await db.select().from(foldersSchema)
  return <DriveContents files={files} folders={folders} />
}
