'use strict';

const auth0 = require('auth0');
const createAuth0Service = require('./auth0-service');
const workers = require('./workers');
const { captureError } = require('./utils');

const {
  AUTH0_DOMAIN,
  AUTH0_INVITE_USERS_CLIENT_ID,
  AUTH0_INVITE_USERS_CLIENT_SECRET,
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
  clientId: AUTH0_INVITE_USERS_CLIENT_ID,
  clientSecret: AUTH0_INVITE_USERS_CLIENT_SECRET
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

/**
 * Lambda SQS FIFO queue trigger that invites a single user.
 *
 * @param {Object} event - SQS message event (FIFO Queue)
 * @param {Object} context - AWS lambda context
 *
 * For more info on SQS message see:
 * https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
 *
 * For more info on AWS lambda context see:
 * https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 *
 */
module.exports.inviteUser = async (event, context) => {
  try {
    // This Lambda trigger always receives a batch of 1 record
    //
    // For more info about the structure of the data see:
    // https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
    const [eventRecord] = event.Records;
    await workers.inviteUser(auth0Service, eventRecord);
  } catch (err) {
    // For now, when there's something wrong with the message, or if inviting
    // the user fails, we don't let SQS re-process this message
    //
    // Effectively this means a new event must be sent by a client to try again
    //
    // For example, if an "inviter" adds a new member from the app, and the
    // "invitee" never gets an invite. The "inviter" will have to delete the
    // added member, and try again.
    captureError(context, err);
  }
};
