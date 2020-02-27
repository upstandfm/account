'use strict';

const auth0 = require('auth0');
const createAuth0Service = require('./auth0-service');
const createInviteService = require('./invite-service');
const { captureError } = require('./utils');

const {
  AUTH0_DOMAIN,
  AUTH0_ACCOUNT_CLIENT_ID,
  AUTH0_ACCOUNT_CLIENT_SECRET,
  AUTH0_APP_CLIENT_ID
} = process.env;

/**
 * To interact with the Auth0 management API, we use a "Non Interactive Client"
 * to fetch an access_token via the Client Credentials Grant.
 *
 * Using the "clientId" and "clientSecret", the client fetches and caches the
 * token for the duration of the returned "expires_in" value.
 *
 * For more info see:
 * https://auth0.github.io/node-auth0/module-management.ManagementClient.html
 */
const managementClient = new auth0.ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_ACCOUNT_CLIENT_ID,
  clientSecret: AUTH0_ACCOUNT_CLIENT_SECRET
});

/**
 * To interact with the Auth0 Authentication API we use the "clientId" of the
 * app, because we'll need to trigger a password reset, which is technically a
 * user action.
 *
 * For more info see:
 * https://auth0.github.io/node-auth0/module-auth.AuthenticationClient.html
 */
const authClient = new auth0.AuthenticationClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_APP_CLIENT_ID
});

const auth0Service = createAuth0Service(managementClient, authClient);
const inviteService = createInviteService(auth0Service);

/**
 * Lambda SNS topic subscriber that invites a single user.
 *
 * @param {Object} event - SNS message event
 * @param {Object} context - AWS lambda context
 *
 * For more info on SNS message see:
 * https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
 *
 * For more info on AWS lambda context see:
 * https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 *
 */
module.exports.inviteUser = async (event, context) => {
  try {
    await inviteService.send(event);
  } catch (err) {
    captureError(context, err);
  }
};
