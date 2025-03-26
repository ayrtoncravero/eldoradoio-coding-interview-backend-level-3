import Joi from 'joi';

export const updateItemById = (data: any) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().optional(),
        price: Joi.number().min(1).optional(),
    }).options({ allowUnknown: true });

    return schema.validate(data);
};
