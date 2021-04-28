import mongo from 'mongodb'

export const toObjectId = (id) => mongo.ObjectId(id)
