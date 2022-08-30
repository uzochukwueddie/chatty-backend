import Joi, { ObjectSchema } from 'joi';

const addImageSchema: ObjectSchema = Joi.object().keys({
  image: Joi.string().required()
});

export { addImageSchema };
