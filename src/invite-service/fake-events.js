'use strict';

module.exports = {
  invalidRecord: {
    Records: [
      {
        EventVersion: 'v1876.366.192',
        EventSubscriptionArn:
          'arnie:aws:sns:broomcloset:1029367:sns-lambda:48uwt3-47r8r-38fge',
        EventSource: 'alpha-centauri',
        Sns: {
          SignatureVersion: '1000',
          Timestamp: '2019-01-02T12:45:07.000Z',
          Signature: 'dgZrwddidia/dkfje9ruDJ94393+tE/1+12z615r==',
          SigningCertUrl:
            'https://sns.broomcloset.amazonaws.com/SimpleNotificationService-jje839e9ekfd2.pem',
          MessageId: '91e3r4-e1wse8-51sdfr9-24d2sjsjdb5e',
          Message: '',
          MessageAttributes: {},
          Type: 'Notification',
          UnsubscribeUrl:
            'https://sns.broomcloset.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arnie:aws:sns:broomcloset:1029367:sns-lambda:48uwt3-47r8r-38fge',
          TopicArn: 'arnie:aws:sns:broomcloset:1029367:kakaa',
          Subject: 'Invalid Event Record'
        }
      }
    ]
  },
  malformedMessage: {
    Records: [
      {
        EventVersion: '1.0',
        EventSubscriptionArn:
          'arn:aws:sns:us-east-2:1029367:sns-lambda:21beed-a58-495-898-a25486',
        EventSource: 'aws:sns',
        Sns: {
          SignatureVersion: '1',
          Timestamp: '2019-01-02T12:45:07.000Z',
          Signature:
            'tcc6faL2yUC6dgZdmrwh1Y4cGa/ebXEkAi6RibDsvpi+tE/1+82j65r==',
          SigningCertUrl:
            'https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c595a1d9b.pem',
          MessageId: '95db4-ee8-5c9-903-4c2211eb5e',
          Message: '{true;1>$hello->]',
          MessageAttributes: {},
          Type: 'Notification',
          UnsubscribeUrl:
            'https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:1029367:sns-lambda:21beed-a58-495-898-a25486',
          TopicArn: 'arn:aws:sns:us-east-2:1029367:sns-lambda',
          Subject: 'Malformed Message'
        }
      }
    ]
  },
  invalidMessage: {
    Records: [
      {
        EventVersion: '1.0',
        EventSubscriptionArn:
          'arn:aws:sns:us-east-2:1029367:sns-lambda:21beed-a58-495-898-a25486',
        EventSource: 'aws:sns',
        Sns: {
          SignatureVersion: '1',
          Timestamp: '2019-01-02T12:45:07.000Z',
          Signature:
            'tcc6faL2yUC6dgZdmrwh1Y4cGa/ebXEkAi6RibDsvpi+tE/1+82j65r==',
          SigningCertUrl:
            'https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c595a1d9b.pem',
          MessageId: '95db4-ee8-5c9-903-4c2211eb5e',
          Message: JSON.stringify({
            id: 'Q1fEpx2',
            workspaceId: 'Op3r4ef',
            createdBy: [],
            createdAt: 1,
            updatedAt: false,
            email: 'https://www.daniel@upstand.fm',
            inviterFullName: null,
            status: 'ok'
          }),
          MessageAttributes: {},
          Type: 'Notification',
          UnsubscribeUrl:
            'https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:1029367:sns-lambda:21beed-a58-495-898-a25486',
          TopicArn: 'arn:aws:sns:us-east-2:1029367:sns-lambda',
          Subject: 'Invalid Message'
        }
      }
    ]
  },
  newInvite: {
    Records: [
      {
        EventVersion: '1.0',
        EventSubscriptionArn:
          'arn:aws:sns:us-east-2:1029367:sns-lambda:21beed-a58-495-898-a25486',
        EventSource: 'aws:sns',
        Sns: {
          SignatureVersion: '1',
          Timestamp: '2019-01-02T12:45:07.000Z',
          Signature:
            'tcc6faL2yUC6dgZdmrwh1Y4cGa/ebXEkAi6RibDsvpi+tE/1+82j65r==',
          SigningCertUrl:
            'https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c595a1d9b.pem',
          MessageId: '95db4-ee8-5c9-903-4c2211eb5e',
          Message: JSON.stringify({
            id: 'Q1fEpx2',
            workspaceId: 'Op3r4ef',
            createdBy: 'user|56e16a6f6e8e3eaf45fa091',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            email: 'daniel@upstand.fm',
            inviterFullName: 'Rick Sanchez',
            status: 'pending'
          }),
          MessageAttributes: {},
          Type: 'Notification',
          UnsubscribeUrl:
            'https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:1029367:sns-lambda:21beed-a58-495-898-a25486',
          TopicArn: 'arn:aws:sns:us-east-2:1029367:sns-lambda',
          Subject: 'New Invite'
        }
      }
    ]
  }
};
