import { RequestHandler } from "express";
import Joi from "joi";
import { genericResponse, userResponse } from "../../services/response.service";
import * as userService from "../../services/user.service";
import { IRequestValidationData, validateRequestData } from "../common.controllers";

// POST /auth/sign-up

const signUpSchema: IRequestValidationData = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
};

export const signUp: RequestHandler[] = [
    validateRequestData(signUpSchema),
    async (req, res, next) => {
        try {
            const user = await userService.create(req.body.username, req.body.password);
            userResponse.created.send(res, {user: user});
        } catch (error) {
            next(error);
        }
    }
]

// POST /auth/sign-in

const signInSchema: IRequestValidationData = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
};

export const signIn: RequestHandler[] = [
    validateRequestData(signInSchema),
    async (req, res, next) => {
        try {
            const user = await userService.authenticate(req.body.username, req.body.password)
            genericResponse.success.send(res, {user: user})
        } catch (error) {
            next(error);
        }
    }
]

// POST /auth/sign-out

const signOutSchema: IRequestValidationData = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

export const signOut: RequestHandler[] = [
    validateRequestData(signOutSchema),
    async (req, res, next) => {
        res.send( `DELETE request with params 'id': ${req.params.id}`);
    }
]

// POST /auth/refresh-token

const refreshTokenSchema: IRequestValidationData = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

export const refreshToken: RequestHandler[] = [
    validateRequestData(refreshTokenSchema),
    async (req, res, next) => {
        res.send( `DELETE request with params 'id': ${req.params.id}`);
    }
]

// GET /auth/test

// const testSchema: IRequestValidationData = {
//     params: Joi.object({
//         id: Joi.number().required(),
//     }),
//     body: Joi.object({
//         name: Joi.string().required(),
//     }),
// };

export const test: RequestHandler[] = [
    // validateRequestData(testSchema),
    async (req, res, next) => {
        genericResponse.success.send(res, {message: 'Authorized'})
    }
]