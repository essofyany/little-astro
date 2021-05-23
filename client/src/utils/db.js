import { MongoClient } from "mongodb";
import { keys } from "../../keys";

export async function connectToDB() {
  const dbClient = await MongoClient.connect(keys.DATABASE_URL);
  return dbClient;
}
