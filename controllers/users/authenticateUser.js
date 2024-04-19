const z = require("zod");
const User = require("../../models/User");
const apiError = require("../../exceptions/apiError");
const jwt = require("jsonwebtoken");

const authenticationSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .refine(async ({ email }) => {
    const user = await User().findOne({ email });

    return !!user;
  }, "User does not exist");

const authenticateUser = async (req, res) => {
  try {
    const body = await req.body;

    await authenticationSchema.parseAsync(body);

    const { email } = body;

    const { createdAt, updatedAt } = await User().findOne({ email });

    const token = jwt.sign(
      { email, createdAt, updatedAt },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TTL || 60 * 120,
      }
    );

    res.status(200).send({ token });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = authenticateUser;
