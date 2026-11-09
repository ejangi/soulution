import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import App from './App';

vi.mock('./firebase.config', () => ({ auth: 'auth', db: 'db' }));
vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: class GoogleAuthProvider {},
  onAuthStateChanged: vi.fn(), signInWithPopup: vi.fn(), signOut: vi.fn(),
}));
vi.mock('./state/problemModel', () => ({ default: {
  blankProblem: () => ({}), getAllProblems: vi.fn().mockResolvedValue([]),
} }));
vi.mock('./components/problemsModal', () => ({ default: () => null }));
vi.mock('./components/errorModal', () => ({ default: () => null }));

beforeEach(() => {
  vi.clearAllMocks();
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback(null);
    return vi.fn();
  });
});

it('signs in with Google and shows errors when the popup fails', async () => {
  signInWithPopup.mockRejectedValueOnce({ code: 'auth/popup-blocked' });
  const user = userEvent.setup();
  render(<App />);
  await user.click(await screen.findByRole('button', { name: 'Sign in with Google' }));
  expect(signInWithPopup).toHaveBeenCalledWith('auth', expect.anything());
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not sign in');
});

it('renders a signed-in user and signs out', async () => {
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback({ uid: 'user' });
    return vi.fn();
  });
  const user = userEvent.setup();
  render(<App />);
  await user.click(await screen.findByText('Logout'));
  await waitFor(() => expect(signOut).toHaveBeenCalledWith('auth'));
});
