import Joi, { ObjectSchema } from 'joi';

const addCommentSchema: ObjectSchema = Joi.object().keys({
  userTo: Joi.string().required().messages({
    'any.required': 'userTo is a required property'
  }),
  postId: Joi.string().required().messages({
    'any.required': 'postId is a required property'
  }),
  comment: Joi.string().required().messages({
    'any.required': 'comment is a required property'
  }),
  profilePicture: Joi.string().optional().allow(null, ''),
  commentsCount: Joi.number().optional().allow(null, '')
});

export { addCommentSchema };
