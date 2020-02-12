'use strict';

const schema = require('./schema');
const { parseRecordBody } = require('./utils');

module.exports = {
  /**
   * Invite a user.
   *
   * @param {Object} service - Invite service
   * @param {Object} eventRecord - SQS event (FIFO Queue)
   *
   * @return {Promise} Void
   */
  inviteUser(service, eventRecord) {
    if (!service) {
      throw new Error('Provide a service to invite a user');
    }

    const record = schema.validateRecord(eventRecord);
    const body = parseRecordBody(record.body);
    const user = schema.validateUser(body);
    return service.createInvite(user);
  }
};
