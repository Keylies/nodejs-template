import { ObjectId } from "mongodb";
import { User, UserHelper } from "../models/user.model";
import bcrypt from "bcrypt";
import { genericResponse, ResponseError, userResponse } from "./response.service";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export const create = async (username: string, password: string) => {
    let userRecord = await UserHelper.findByUsername(username);

    if (userRecord) {
        throw new ResponseError(
            userResponse.usernameAlreadyExists,
            {error: `User '${username}' already exists`}
        );
    }

    const _id = new ObjectId();
    const now = new Date(Date.now());
    const hashedPassword = bcrypt.hashSync(password, 10)

    const user: User = {
        _id,
        username,
        password: hashedPassword,
        created: now,
        updated: now,
        accessToken: '',
    };

    try {
        await UserHelper.insert(user);
    } catch (error) {
        throw new ResponseError(
            genericResponse.internalServerError, 
            {error: 'User has not been inserted'}
        );
    };

    return user;
}

export const authenticate = async (username: string, password: string) => {
    let userRecord = await UserHelper.findByUsername(username);

    if (!userRecord) {
        throw new ResponseError(
            userResponse.notFound,
            {error: `User '${username}' was not found`}
        );
    }

    const validPassword = bcrypt.compareSync(
        password,
        userRecord.password
    );

    if (!validPassword) {
        throw new ResponseError(
            userResponse.invalidPassword,
            {error: `Password incorrect for user '${username}'`} 
        );
    }

    userRecord.accessToken = jwt.sign(
        {id: userRecord._id}, 
        process.env.SECRET_KEY, 
        {expiresIn: 60} // seconds
    );

    return userRecord;
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader === undefined)
        return genericResponse.unauthorized.send(res, {error: 'No token provided'});

    const parsedAuthHeader = authHeader.split(' ');

    if (!parsedAuthHeader || parsedAuthHeader[1] === undefined)
        return genericResponse.unauthorized.send(res, {error: 'No token provided'});

    jwt.verify(parsedAuthHeader[1], process.env.SECRET_KEY, (err, decoded) => {
        if (err)
            return genericResponse.unauthorized.send(res, {error: err});

        next();
    });
}