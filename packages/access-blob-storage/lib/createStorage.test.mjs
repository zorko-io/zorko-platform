import test from '@zorko-io/tool-test-harness'
import {createStorage, ClientTypes} from './createStorage'

test('init blob storage', async (t) => {
  const storage = createStorage({ type: ClientTypes.Minio })
  const folderName = 'testfolder'
  const foldersListBefore = await storage.listFolders()

  t.assert(!foldersListBefore.find(folder => folder.name === folderName), `should not include ${folderName}`)

  await storage.createFolder(folderName)
  const foldersListAfter = await storage.listFolders()

  t.assert(foldersListAfter.find(folder => folder.name === folderName), `should include ${folderName}`)

  await storage.deleteFolder(folderName)

  t.assert(!foldersListBefore.find(folder => folder.name === folderName), `should not include ${folderName}`)
})
