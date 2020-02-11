'use strict';

const Joi = require('@hapi/joi');

const defaultJoi = Joi.defaults(_schema =>
  _schema.options({
    stripUnknown: true
  })
);

const _SqsMsgSchema = defaultJoi.object().keys({
  messageId: Joi.string().required(),
  receiptHandle: Joi.string().required(),
  body: Joi.string().required(),
  attributes: defaultJoi.object().keys({
    ApproximateReceiveCount: Joi.string().required(),
    SentTimestamp: Joi.string().required(),
    SequenceNumber: Joi.string().required(),
    MessageGroupId: Joi.string().required(),
    SenderId: Joi.string().required(),
    MessageDeduplicationId: Joi.string().required(),
    ApproximateFirstReceiveTimestamp: Joi.string().required()
  }),
  messageAttributes: Joi.object(),
  md5OfBody: Joi.string().required(),
  eventSource: Joi.string()
    .regex(/^aws:sqs$/, { name: 'event-source' })
    .required(),
  eventSourceARN: Joi.string().required(),
  awsRegion: Joi.string().required()
});

const _UserInfoSchema = defaultJoi.object().keys({
  id: Joi.string().required(),
  createdBy: Joi.string().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  email: Joi.string().required(),
  fullName: Joi.string().required(),
  workspaceId: Joi.string().required(),
  createdByFullName: Joi.string().required()
});

function _validate(data, schema) {
  const { error: joiErr, value } = schema.validate(data);

  // For Joi "error" see:
  // https://github.com/hapijs/joi/blob/master/API.md#validationerror
  if (joiErr) {
    throw joiErr;
  }

  return value;
}

module.exports = {
  validateRecord(data = {}) {
    return _validate(data, _SqsMsgSchema);
  },

  validateUserInfo(data = {}) {
    return _validate(data, _UserInfoSchema);
  }
};
