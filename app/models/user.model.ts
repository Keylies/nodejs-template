import { ObjectId } from 'mongodb';
import DB from '../services/database.service';

export interface User {
    _id: ObjectId,
    username: string,
    accessToken: string,
    password: string,
    created: Date,
    updated: Date
};

export class UserHelper {
    static findById = (_id: ObjectId) => DB.users.findOne({ _id });
    static findByUsername = (username: string) => DB.users.findOne({ username });
    static findByRefreshToken = (refreshToken: string) => DB.users.findOne({ refreshToken });
    static insert = (user: User) => DB.users.insertOne(user);
}