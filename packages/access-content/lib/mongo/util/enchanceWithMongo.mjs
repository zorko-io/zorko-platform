import {toObjectId} from './toObjectId.mjs'

// TODO: 'access-content' - remove code duplication to coming mongoloid enchance
export function enhanceWithMongo ({clazz, adapter}){

  let newClazz = class MongoModel extends clazz {

    static schema = adapter.schema

    constructor(context) {
      let params = context

      if (context.ops || context.doc) {
        if (context.ops) {
          const doc = context.ops.pop()
          params = adapter.toProps(doc)
        }else if (context.doc){
          params = adapter.toProps(context.doc)
        }
      }
      super(params)
    }

    toDocument() {
      let result = {}

      if (this.id){
        result._id = toObjectId(this.id)
      }

      return {
        ...adapter.toDocument(this),
        ...result
      }
    }
  }

  console.log({NEW_CLAZZ: newClazz})

  return newClazz
}