'use strict';

const workers = require('./workers');

describe('inviteUser(service, eventRecord)', () => {
  it('throws without service', () => {
    expect(() => {
      workers.inviteUser();
    }).toThrowError(/^Provide a service to invite a user$/);
  });

  it('throws with invalid event record', () => {
    const fakeService = {
      createInvite: () => Promise.resolve()
    };

    const invalidEventRecord = {
      messageId: '11e51-4cc7-43a02-9e22-7df5',
      receiptHandle: 'AQX8nZEXm4khsmeyIE8iQ',
      body: 'Some message.',
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1573251510774',
        SequenceNumber: '18849464069128',
        MessageGroupId: '1',
        SenderId: 'AIDIOY1VJENQZ4VO',
        MessageDeduplicationId: '1',
        ApproximateFirstReceiveTimestamp: '1573251510774'
      },
      messageAttributes: {},
      md5OfBody: 'e4e68fb7bd0e67a0ae8f1b34246b3',
      eventSource: 'aws:sns',
      eventSourceARN: 'arn:aws:sqs:eu-central-1:123456789012:fifo.fifo',
      awsRegion: 'eu-central-1'
    };

    expect(() => {
      workers.inviteUser(fakeService, invalidEventRecord);
    }).toThrowError(
      /^"eventSource" with value "aws:sns" fails to match the event-source pattern$/
    );
  });

  it('throws with malformed event record body', () => {
    const fakeService = {
      createInvite: () => Promise.resolve()
    };

    const invalidEventRecord = {
      messageId: '11e51-4cc7-43a02-9e22-7df5',
      receiptHandle: 'AQX8nZEXm4khsmeyIE8iQ',
      body: 'Some message.',
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1573251510774',
        SequenceNumber: '18849464069128',
        MessageGroupId: '1',
        SenderId: 'AIDIOY1VJENQZ4VO',
        MessageDeduplicationId: '1',
        ApproximateFirstReceiveTimestamp: '1573251510774'
      },
      messageAttributes: {},
      md5OfBody: 'e4e68fb7bd0e67a0ae8f1b34246b3',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:eu-central-1:123456789012:fifo.fifo',
      awsRegion: 'eu-central-1'
    };

    expect(() => {
      workers.inviteUser(fakeService, invalidEventRecord);
    }).toThrowError(/^Message body contains invalid JSON$/);
  });

  it('throws with invalid event record body', () => {
    const fakeService = {
      createInvite: () => Promise.resolve()
    };

    const invalidEventRecord = {
      messageId: '11e51-4cc7-43a02-9e22-7df5',
      receiptHandle: 'AQX8nZEXm4khsmeyIE8iQ',
      body: JSON.stringify({ name: 'Daniël' }),
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1573251510774',
        SequenceNumber: '18849464069128',
        MessageGroupId: '1',
        SenderId: 'AIDIOY1VJENQZ4VO',
        MessageDeduplicationId: '1',
        ApproximateFirstReceiveTimestamp: '1573251510774'
      },
      messageAttributes: {},
      md5OfBody: 'e4e68fb7bd0e67a0ae8f1b34246b3',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:eu-central-1:123456789012:fifo.fifo',
      awsRegion: 'eu-central-1'
    };

    expect(() => {
      workers.inviteUser(fakeService, invalidEventRecord);
    }).toThrowError();
  });

  it('invites user for valid event record', () => {
    const fakeService = {
      createInvite: jest.fn(() => Promise.resolve(undefined))
    };

    const now = new Date().toISOString();
    const validUser = {
      id: '1zXzaq3re',
      createdBy: 'auth0|56eae5f646e64a65e6aff56',
      createdAt: now,
      updatedAt: now,
      email: 'daniel@upstand.fm',
      fullName: 'Daniël Illouz',
      workspaceId: 'Pe3xF45rq',
      createdByFullName: 'Rick Sanchez'
    };

    const validEventRecord = {
      messageId: '11e51-4cc7-43a02-9e22-7df5',
      receiptHandle: 'AQX8nZEXm4khsmeyIE8iQ',
      body: JSON.stringify(validUser),
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1573251510774',
        SequenceNumber: '18849464069128',
        MessageGroupId: '1',
        SenderId: 'AIDIOY1VJENQZ4VO',
        MessageDeduplicationId: '1',
        ApproximateFirstReceiveTimestamp: '1573251510774'
      },
      messageAttributes: {},
      md5OfBody: 'e4e68fb7bd0e67a0ae8f1b34246b3',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:eu-central-1:123456789012:fifo.fifo',
      awsRegion: 'eu-central-1'
    };

    const res = workers.inviteUser(fakeService, validEventRecord);
    expect(res).resolves.toBe(undefined);
    expect(fakeService.createInvite.mock.calls.length).toBe(1);
  });
});
