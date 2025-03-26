import Joi from 'joi';
import Item from '../interfaces/IItem';

export const createItemValidate = (data: Item) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().min(1).required(),
    }).options({ allowUnknown: true });

    return schema.validate(data);
};
