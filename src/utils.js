'use strict';

module.exports = {
  /**
   * Parse the body of an SQS event record.
   *
   * @param {String} body - JSON string
   *
   * @return {Object} Parsed message
   */
  parseRecordBody(body) {
    try {
      return JSON.parse(body);
    } catch (err) {
      const parseErr = new Error('Message body contains invalid JSON');
      parseErr.name = 'ParseError';
      parseErr.details = err.message;
      throw parseErr;
    }
  },

  /**
   * Capture errors by sending them to Serverless Dashboard.
   *
   * Captured errors can be found here:
   * https://dashboard.serverless.com/tenants/upstandfm/applications/api/services/invite-users/stage/prod/region/eu-central-1#service-overview=alerts
   *
   * @param {Object} context - AWS Lambda context
   * @param {Object} err - Error
   */
  captureError(context, err) {
    // Provided by Serverless Framework
    if (context && context.captureError) {
      context.captureError(err);
    }
  }
};
