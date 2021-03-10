import test from '@zorko-io/tool-test-harness'
import mongo from 'mongodb'
import { MongoMemoryServer} from 'mongodb-memory-server'
// import {createSpaces} from './createSpaces.mjs'

test('async - parses valid value', async (t) => {
  // const spaces = createSpaces()
  const spaces = {}

  const mongod = new MongoMemoryServer()

  const uri = await mongod.getUri();

  const client = new mongo.MongoClient(uri);

  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Closing client...");

  }


  console.log({uri})

  t.truthy(spaces)

  await mongod.stop()

})
