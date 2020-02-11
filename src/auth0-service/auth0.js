'use strict';

const generatePassword = require('./generate-password');
const api = require('./api');

module.exports = {
  /**
   * Create a user and reset their password via Auth0.
   *
   * We use the Auth0 APIs to "mimic" an invite. Auth0 doesn't have an "user
   * invite API" at the moment.
   *
   * @param {Object} managementClient - Auth0 Management API V2 client
   * @param {Object} authClient - Auth0 Authentication API client
   * @param {Object} user
   *
   * @return {Promise} Void
   */
  async createUserAndResetPassword(managementClient, authClient, user) {
    // For more info about what data we can provide, see Auth0 Management API
    // V2 docs:
    // https://auth0.com/docs/api/management/v2#!/Users/post_users
    const data = {
      connection: 'Username-Password-Authentication',

      // Since this a new user, the email is as of yet unverified
      email_verified: false,

      // In this case we prevent sending a verification email, because the
      // password reset flow will set the email to verified if the user
      // visits the password reset link (that will be sent via email), and
      // sets a new password
      verify_email: false,

      // Auth0 requires us to provide a password, so we create a random one, and
      // will reset it immediately after the user has been created
      password: generatePassword(),

      email: user.email,
      name: user.fullName,
      app_metadata: {
        workspaceId: user.workspaceId,
        invitedBy: user.createdBy,

        // We use these props in the Auth0 email template to send correct text
        // Otherwise there's no way to distinguish between a user invite and a
        // "regular" password reset
        //
        // Note that these props are ephemeral, and are unset with a custom
        // Auth0 rule, after the invited user logs in for the first time
        isUserInvite: true,
        inviteMsg: `${user.createdByFullName} invited you to Upstand FM!`
      }
    };

    const auth0User = await api.createUser(managementClient, data);
    await api.sendPasswordResetEmail(authClient, auth0User.email);
  }
};
