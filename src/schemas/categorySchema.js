import joi from "joi";

const createCategorySchema = joi.object({
  name: joi.string().required(),
});

export default createCategorySchema;
