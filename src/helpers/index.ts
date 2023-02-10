import Joi from 'joi'

export const bookingSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    'string.empty':'Please add a email',
    'string.email':'Not a valid email'
  }),
  Destination: Joi.string().required(),
  TravelDate: Joi.string().required(),
}
)

export const validationSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    'string.empty':'Please add an email',
    'string.email':'Not a valid email'
  }),
  Password: Joi.string().required()
  // .pattern(new RegExp('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/'))
})

export const loginSchema = Joi.object({
  Email: Joi.string().required().email().messages({
    'string.empty':'Please add an email',
    'string.email':'Not a valid email'
  }),
  Password: Joi.string().required()
})