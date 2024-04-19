const z = require("zod");
const User = require("../../models/User");
const apiError = require("../../exceptions/apiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    const { email, password } = body;

    const user = await User().findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.sendStatus(401);
      return;
    }

    const expiresIn = +process.env.JWT_TTL || 120 * 60;
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn,
    });

    res.status(200).send({ token });
  } catch (err) {
    apiError(err, res);
  }
};

module.exports = authenticateUser;
