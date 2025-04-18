import Joi from 'joi';

export const getItemById = (data: any) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
    }).options({ allowUnknown: true });

    return schema.validate(data);
};
