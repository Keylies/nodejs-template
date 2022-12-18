import DB from '../services/database.service';

export default async () => {
  await DB.connect();
}