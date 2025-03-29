import Joi from 'joi';

export class GetItemByIdDto {
    id!: string;

    static validate(dto: GetItemByIdDto) {
        const schema = Joi.object({
            id: Joi.string().required().messages({
                'string.empty': 'El id es obligatorio',
                'any.required': 'El id es obligatorio',
            }),
        });

        return schema.validate(dto); // Validamos el DTO
    }
}
