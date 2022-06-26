import { AuthProvider } from '@pankod/refine-core';
import { APP_ROOT_URL } from 'config';

export const TOKEN_KEY = 'refine-auth';

export const authProvider: AuthProvider = {
  login: async ({ email, password, passwordConfirm }) => {
    const body = new FormData();

    body.set('email', email);
    body.set('password', password);
    body.set('passwordConfirm', passwordConfirm);

    const res = await fetch(`${APP_ROOT_URL}/login`, {
      method: 'POST',
      body,
    });

    if (res.ok) {
      return;
    }

    const result = await res.json();

    throw new Error(result.message ?? result);
  },
  logout: async () => {
    await fetch(`${APP_ROOT_URL}/logout`, {
      method: 'POST',
    });
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const res = await fetch(`${APP_ROOT_URL}/current`);

    if (res.ok) {
      return Promise.resolve();
    }

    const result = await res.json();

    throw new Error(result.message ?? result);
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const res = await fetch(`${APP_ROOT_URL}/current`);

    if (res.ok) {
      return Promise.resolve();
    }

    const result = await res.json();

    throw new Error(result.message ?? result);
  },
};
