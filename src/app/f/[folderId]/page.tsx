import DriveContents from "~/app/drive-contents"
import {
  getFolders,
  getFiles,
  getAllParentsForFolder,
} from "~/server/db/queries"

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>
}) {
  const params = await props.params

  const parsedFolderId = parseInt(params.folderId)
  // degug
  console.log(parsedFolderId)
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>
  }

  const [folders, files, parents] = await Promise.all([
    getFolders(parsedFolderId),
    getFiles(parsedFolderId),
    getAllParentsForFolder(parsedFolderId),
  ])

  return <DriveContents files={files} folders={folders} parents={parents} />
}
