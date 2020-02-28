'use strict';

const Joi = require('@hapi/joi');

const defaultJoi = Joi.defaults(_schema =>
  _schema.options({
    stripUnknown: true
  })
);

const _SnsMsgSchema = defaultJoi.object().keys({
  EventVersion: Joi.string()
    .required()
    .valid('1.0'),

  EventSource: Joi.string()
    .required()
    .valid('aws:sns'),

  EventSubscriptionArn: Joi.string().required(),
  Sns: defaultJoi.object().keys({
    SignatureVersion: Joi.string().required(),
    Timestamp: Joi.string().required(),
    Signature: Joi.string().required(),
    SigningCertUrl: Joi.string().required(),
    MessageId: Joi.string().required(),
    Message: Joi.string().required(),
    MessageAttributes: Joi.object(),
    Type: Joi.string().required(),
    UnsubscribeUrl: Joi.string().required(),
    TopicArn: Joi.string().required(),
    Subject: Joi.string().allow(null)
  })
});

const _InviteSchema = defaultJoi.object().keys({
  id: Joi.string().required(),
  workspaceId: Joi.string().required(),
  createdBy: Joi.string().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  email: Joi.string()
    .email({
      tlds: {
        // Disable TLD validation to allow any TLD as valid
        // For more info see:
        // https://hapi.dev/family/joi/api/?v=17.1.0#stringemailoptions
        allow: false
      }
    })
    .required(),

  inviterFullName: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid('pending')
});

function _validate(data, schema) {
  const { error: joiErr, value } = schema.validate(data);

  // For Joi "error" see:
  // https://github.com/hapijs/joi/blob/master/API.md#validationerror
  if (joiErr) {
    const err = new Error('Invalid event data');
    err.details = joiErr.details.map(e => e.message);
    throw err;
  }

  return value;
}

module.exports = {
  validateRecord(data = {}) {
    return _validate(data, _SnsMsgSchema);
  },

  validateInvite(data = {}) {
    return _validate(data, _InviteSchema);
  }
};
