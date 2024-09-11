import { ServerApiVersion } from "mongodb"

export const defaultMongoDbConfig = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

export const dbName = 'chatbot'
export const collectionName = process.env.NODE_ENV === 'development' ? 'test' : 'knowledge'
export const uri = process.env.URI
