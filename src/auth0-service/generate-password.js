const password = require('generate-password');

/**
 * Generate a random password.
 *
 * We currently have the following Auth0 password policy:
 * - Use at least 8 characters
 * - Use lower case letters (a-z)
 * - Use upper case letters (A-Z)
 * - Use numbers (0-9)
 * - Use special characters (ex. !@#)
 *
 * For more info see "Username-Password-Authentication" > "Password Policy":
 * https://manage.auth0.com/dashboard/eu/upstandfm/connections/database
 *
 * @return {String} Random password
 */
module.exports = function generatePassword() {
  // For more info see:
  // https://github.com/brendanashworth/generate-password#available-options
  const options = {
    length: 18,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true
  };

  return password.generate(options);
};
