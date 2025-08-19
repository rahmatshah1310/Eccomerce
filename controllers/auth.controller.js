const joiSchemas = require("../validation/user.schema");
const UserService = require("../services/user.service");
const { generateToken } = require("../helpers/jwt");

module.exports.local_login_post = async (req, res) => {
  try {
    const result = await joiSchemas.local_login_post.validateAsync(req.body);

    const newUser = await UserService.addUser({
      email: result.email,
      password: result.password,
    });

    return res.success(generateToken(newUser));
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.get_me = async (req, res) => {
  try {
    res.success(req.user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
