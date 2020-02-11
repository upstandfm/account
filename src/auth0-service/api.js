'use strict';

module.exports = {
  /**
   * Create an Auth0 user.
   *
   * @param {Object} client - Auth0 Management client
   * @param {Object} data - user data
   *
   * @return {Promise} Resolves with created user
   *
   * For SDK docs see:
   * https://auth0.github.io/node-auth0/module-management.ManagementClient.html#createUser
   */
  createUser(client, data) {
    return client.createUser(data);
  },

  /**
   * Send a password reset email to a user.
   *
   * @param {Object} client - Auth0 Authentication client
   * @param {String} email
   *
   * @return {Promise} Void
   *
   * For SDK docs see:
   * https://auth0.github.io/node-auth0/module-auth.AuthenticationClient.html#requestChangePasswordEmail
   */
  sendPasswordResetEmail(client, email) {
    // For more info about possible params, see Auth0 Authentication API:
    // https://auth0.com/docs/api/authentication#change-password
    const params = {
      connection: 'Username-Password-Authentication',
      email
    };
    return client.requestChangePasswordEmail(params);
  },

  /**
   * Create reset password link for an Auth0 user
   *
   * NOTE: this ONLY creates a link, and does NOT send an email.
   *
   * @param {Object} client - Auth0 Management client
   * @param {String} userId
   *
   * @return {Promise} Resolves with link
   *
   * For SDK docs see:
   * https://auth0.github.io/node-auth0/module-management.ManagementClient.html#createPasswordChangeTicket
   */
  async createResetPasswordLink(client, userId) {
    // For more info about possible params, see Auth0 Management API V2 docs:
    // https://auth0.com/docs/api/management/v2#!/Tickets/post_password_change
    const params = {
      user_id: userId,

      // Set the email as verified after the user resets their password
      mark_email_as_verified: true
    };
    const res = await client.createPasswordChangeTicket(params);
    return res.ticket;
  }
};
