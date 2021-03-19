import {Resource} from '../core/index.mjs'

export class MongoResource extends Resource {

  static schema = {
    bsonType: "object",
    required: [ "name", "parent"],
    properties: {
      name: {
        bsonType: "string",
        description: "must be a string and is required"
      },
      parent: {
        bsonType: "string",
        description: "Id of parent resource"
      },
      content: {
        bsonType: "object",
        description: "Resource Content"
      }
    }
  }


}