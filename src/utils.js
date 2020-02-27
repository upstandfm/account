'use strict';

module.exports = {
  /**
   * Parse a JSON message string.
   *
   * @param {String} msg - JSON string
   *
   * @return {Object} Parsed message
   */
  parseMessage(msg) {
    try {
      return JSON.parse(msg);
    } catch (err) {
      const parseErr = new Error('Message contains invalid JSON');
      parseErr.name = 'ParseError';
      parseErr.details = err.message;
      throw parseErr;
    }
  },

  /**
   * Capture errors by sending them to Serverless Dashboard.
   *
   * Captured errors can be found here:
   * https://dashboard.serverless.com/tenants/upstandfm/applications/api/services/account/stage/prod/region/eu-central-1#service-overview=alerts
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
