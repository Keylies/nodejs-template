import { Collection, Db, MongoClient } from 'mongodb';
import { User } from '../models/user.model';

export default class DB {
  static db: Db;
  static mongoClient: MongoClient;
  static users: Collection<User>;
  static collections: Map<String, Collection>;

  static connect = (): Promise<MongoClient> => {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.DB_HOST);

      try {
        await client.connect();

        DB.db = client.db('node_template');
        DB.db.command({ ping: 1 });
        DB.mongoClient = client;
        DB.users = DB.db.collection<User>('users');
      } catch (error) {
        return reject(error);
      }

      return resolve(client);
    });
  }

  static disconnect = async () => {
    if (DB.mongoClient) await DB.mongoClient.close();
  }
}