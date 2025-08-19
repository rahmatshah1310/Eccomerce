const User = require("../model/user");

module.exports.addUser = async ({ email, password }) => {
  try {
    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: password.trim(),
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Username or email already exists");
    }
    console.error("UserService [addUserBasic] Error:", error);
    throw error;
  }
};

module.exports.validatePassword = (user, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const foundUser = await User.findOne(user._id);
      const validation = await foundUser.$isValidPassword(password);
      return validation;
    } catch (error) {
      console.error("UserService [validatepassword] Error", error);
      return reject(error);
    }
  });

module.exports.readById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("UserService [readById] Error:", error);
    throw error;
  }
};
