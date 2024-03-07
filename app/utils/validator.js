// const Joi = require("joi");

// const msgSchema = Joi.object({
//   name: Joi.string()
//     .min(3)
//     .max(30)
//     .regex(/^[a-zA-Z\s]+$/, { name: "alphabetsAndSpaces" }) // Only allow letters and spaces
//     .required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "io"] } })
//     .trim()
//     .lowercase()
//     .required(),
//   message: Joi.string().trim().max(1000).required(),
// });

// const getSchema = Joi.object({
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "io"] } })
//     .trim()
//     .lowercase()
//     .required(),
//   password: Joi.string().trim().required(),
// });

// module.exports = { msgSchema, getSchema };
