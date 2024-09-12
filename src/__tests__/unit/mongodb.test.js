import 'dotenv/config'
import { uri, defaultMongoDbConfig, dbName, collectionName } from "../../infrastructure/config/db";
import MongoDbClient from "../../infrastructure/persistence/database/mongodb/client";

describe('MongoDb Client', () => {
  const mongoDbClient = MongoDbClient(uri, dbName, collectionName, defaultMongoDbConfig);
  it('should connect to the server and return ok',async () => {
    const status = await mongoDbClient.ping()
    await mongoDbClient.closeConnection()
    expect(status).toEqual({ ok: 1 })
  });
  
});
