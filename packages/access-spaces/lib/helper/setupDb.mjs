import {DbManager} from './DbManager'

// TODO: move to test harness package
export function setupDb(test) {
  const manager = new DbManager()

  test.beforeEach(async (t) => {
    t.context.db = await manager.start()
  })

  test.afterEach(async (t) => {
    await manager.stop()
    delete t.context.db
  })
}