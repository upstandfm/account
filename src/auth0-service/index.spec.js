'use strict';

const createAuth0Service = require('.');

describe('Auth0 service', () => {
  describe('createAuth0Service(managementClient, authClient)', () => {
    it('throws without management client', () => {
      expect(() => {
        createAuth0Service();
      }).toThrowError(/^Provide an Auth0 management client$/);
    });

    it('throws without auth client', () => {
      expect(() => {
        const fakeManagementClient = {};
        createAuth0Service(fakeManagementClient);
      }).toThrowError(/^Provide an Auth0 auth client$/);
    });

    it('creates service', () => {
      expect(() => {
        const fakeManagementClient = {};
        const fakeAuthClient = {};
        createAuth0Service(fakeManagementClient, fakeAuthClient);
      }).not.toThrowError();
    });
  });
});
