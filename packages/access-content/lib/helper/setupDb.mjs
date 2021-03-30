import {DbManager} from './DbManager'

// TODO: DB tests, move to test harness package
export function setupDb(test, beforeEach = async () => {}) {
  const manager = new DbManager()

  test.beforeEach(async (t) => {
    t.context.db = await manager.start()
    await beforeEach(t)
  })

  test.afterEach(async (t) => {
    await manager.stop()
    delete t.context.db
  })
}