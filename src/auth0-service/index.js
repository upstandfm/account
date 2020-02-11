'use stric';

const auth0 = require('./auth0');

/**
 * Create a service to interact with Auth0 APIs.
 *
 * @param {Object} managementClient - Auth0 Management API V2 client
 * @param {Object} authClient - Auth0 Authentication API client
 *
 * @return {Object} Instantiated Auth0 "service interface"
 */
module.exports = function createAuth0Service(managementClient, authClient) {
  const protocol = {
    /**
     * Create a user invite via Auth0.
     *
     * @param {Object} user
     *
     * @return {Promise} Void
     */
    createInvite(user) {
      return auth0.createUserAndResetPassword(
        managementClient,
        authClient,
        user
      );
    }
  };

  return protocol;
};
