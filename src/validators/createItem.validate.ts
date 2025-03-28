import Joi from 'joi';

export const createItemValidate = (data: any) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().min(1).required(),
    }).options({ allowUnknown: true });

    return schema.validate(data);
};
