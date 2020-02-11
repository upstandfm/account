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
  }
};
