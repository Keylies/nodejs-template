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
            userResponse.created.send(res, user);
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
            genericResponse.success.send(res, user)
        } catch (error) {
            next(error);
        }
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

export const test: RequestHandler[] = [
    async (req, res, next) => {
        genericResponse.success.send(res, {message: 'Authorized'})
    }
]