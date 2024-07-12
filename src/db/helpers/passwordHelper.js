const bcrypt = require("bcrypt");

const SALT = parseInt(process.env.SALT_PWD);
class PasswordHelper {
  static async hashPassword(pass) {
    try {
      const hash = await bcrypt.hash(pass, SALT);
      return hash;
    } catch (error) {
      console.error("deu errado", error);
    }
  }

  static async comparePassword(pass, hash) {
    try {
      const isMatch = await bcrypt.compare(pass, hash);
      return isMatch;
    } catch (error) {
      throw new Error('Erro ao comparar senha ' + error.message)
    }
  }
}

module.exports = PasswordHelper;
