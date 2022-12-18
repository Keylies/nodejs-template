import { RequestHandler } from "express";
import Joi from "joi";
import { genericResponse } from "../../services/response.service";
import { IRequestValidationData, validateRequestData } from "../common.controllers";

// GET /requests

const getWithQueryParamsSchema: IRequestValidationData = {
    query: Joi.object({
        param1: Joi.number().required(),
        param2: Joi.string().required()
    }),
};

export const getWithQueryParams: RequestHandler[] = [
    validateRequestData(getWithQueryParamsSchema),
    async (req, res, next) => {
        genericResponse.success.send(res, {message: `GET request with query params: ${JSON.stringify(req.query)}`});
    }
]

// GET /requests/:id

const getWithRouteParamsSchema: IRequestValidationData = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

export const getWithRouteParams: RequestHandler[] = [
    validateRequestData(getWithRouteParamsSchema),
    async (req, res, next) => {
        genericResponse.success.send(res, {message: `GET request with params 'id': ${req.params.id}`});
    }
]

// DELETE /requests/:id

const deleteWithRouteParamsSchema: IRequestValidationData = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

export const deleteWithRouteParams: RequestHandler[] = [
    validateRequestData(deleteWithRouteParamsSchema),
    async (req, res, next) => {
        genericResponse.success.send(res, {message: `DELETE request with params 'id': ${req.params.id}`});
    }
]

// POST /requests/:id

const postWithRouteParamsAndBodySchema: IRequestValidationData = {
    params: Joi.object({
        id: Joi.number().required(),
    }),
    body: Joi.object({
        name: Joi.string().required(),
    }),
};

export const postWithRouteParamsAndBody: RequestHandler[] = [
    validateRequestData(postWithRouteParamsAndBodySchema),
    async (req, res, next) => {
        genericResponse.success.send(res, {message: `POST request with params 'id': ${req.params.id} and body: ${JSON.stringify(req.body)}`});
    }
]