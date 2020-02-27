'use strict';

const { parseMessage } = require('../utils');
const schema = require('./schema');

/**
 * Create an invite service.
 *
 * @param {Object} authService
 *
 * @return {Object} Invite service interface
 */
module.exports = function createInviteService(authService) {
  if (!authService) {
    throw new Error('Provide an auth service to invite users');
  }

  return {
    /**
     * Send an invitation.
     *
     * @param {Object} event - SNS Lambda trigger event
     *
     * @return {Promise} Void
     */
    send(event) {
      // An SNS notification always contains a SINGLE record
      // For more info see "Reliability":
      // https://aws.amazon.com/sns/faqs/
      const [eventRecord] = event.Records;
      const record = schema.validateRecord(eventRecord);
      const msg = parseMessage(record.Sns.Message);
      const invite = schema.validateInvite(msg);
      return authService.sendInvite(invite);
    }
  };
};
