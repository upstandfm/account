'use strict';

const createInviteService = require('.');
const fakeEvents = require('./fake-events');

describe('Invite service', () => {
  describe('createInviteService(authService)', () => {
    it('throws without auth service', () => {
      expect(() => {
        createInviteService();
      }).toThrowError(/^Provide an auth service to invite users$/);
    });

    it('creates service', () => {
      expect(() => {
        const fakeAuthService = {};
        createInviteService(fakeAuthService);
      }).not.toThrowError();
    });
  });

  describe('inviteService.send(event)', () => {
    it('throws with invalid event record', () => {
      const fakeAuthService = {
        createUserInvite: () => Promise.resolve()
      };
      const inviteService = createInviteService(fakeAuthService);

      expect(() => {
        inviteService.send(fakeEvents.invalidRecord);
      }).toThrowError(/^Invalid event data$/);
    });

    it('throws with malformed event record message', () => {
      const fakeAuthService = {
        createUserInvite: () => Promise.resolve()
      };
      const inviteService = createInviteService(fakeAuthService);

      expect(() => {
        inviteService.send(fakeEvents.malformedMessage);
      }).toThrowError(/^Message contains invalid JSON$/);
    });

    it('throws with invalid event record message', () => {
      const fakeAuthService = {
        createUserInvite: () => Promise.resolve()
      };
      const inviteService = createInviteService(fakeAuthService);

      expect(() => {
        inviteService.send(fakeEvents.invalidMessage);
      }).toThrowError(/^Invalid event data$/);
    });

    it('invites user for valid event record', async () => {
      const fakeAuthService = {
        createUserInvite: jest.fn(() => Promise.resolve())
      };
      const inviteService = createInviteService(fakeAuthService);
      await inviteService.send(fakeEvents.newInvite);

      expect(fakeAuthService.createUserInvite.mock.calls.length).toBe(1);
    });
  });
});
