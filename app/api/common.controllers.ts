import { RequestHandler } from 'express';
import Joi from 'joi';
import { genericResponse } from '../services/response.service';

export interface IRequestValidationData {
    params?: Joi.AnySchema,
    query?: Joi.AnySchema,
    body?: Joi.AnySchema,
    headers?: Joi.AnySchema,
    files?: Joi.AnySchema,
}

export const validateSchema = (schema: Joi.AnySchema, data: any) => {
    const validation = schema.validate(data);

    if (validation.error) throw validation.error;
        return validation.value;
};

export const validateRequestData = (data: IRequestValidationData): RequestHandler => {
    return (req, res, next) => {
        try {
            if (data.params) req.params = validateSchema(data.params!, req.params);
            if (data.query) req.query = validateSchema(data.query!, req.query);
            if (data.body) req.body = validateSchema(data.body!, req.body);
            if (data.headers) req.headers = validateSchema(data.headers!, req.headers);
        } catch (error) {
            genericResponse.badRequest.send(res, { error });
        }

        return next();
    };
};