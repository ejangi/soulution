import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import problems from './problemModel';

vi.mock('../firebase.config', () => ({ db: 'database' }));
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, addDoc: vi.fn(), collection: vi.fn(), deleteDoc: vi.fn(), doc: vi.fn(), getDocs: vi.fn(), orderBy: vi.fn(), query: vi.fn(), updateDoc: vi.fn(), where: vi.fn() };
});

beforeEach(() => {
  vi.clearAllMocks();
  collection.mockReturnValue('collection');
  doc.mockReturnValue('document');
  where.mockReturnValue('owner filter');
  orderBy.mockReturnValue('date order');
  query.mockReturnValue('query');
});

describe('problem persistence', () => {
  it('queries only the signed-in user’s problems in date order', async () => {
    getDocs.mockResolvedValue({ docs: [{ id: 'one', data: () => ({ uid: 'user' }) }] });
    expect(await problems.getAllProblems('user')).toEqual([{ id: 'one', uid: 'user' }]);
    expect(where).toHaveBeenCalledWith('uid', '==', 'user');
    expect(orderBy).toHaveBeenCalledWith('LastUpdatedDate', 'desc');
    expect(query).toHaveBeenCalledWith('collection', 'owner filter', 'date order');
  });

  it('creates and deletes documents', async () => {
    addDoc.mockResolvedValue({ id: 'new' });
    const created = await problems.saveCurrentProblem({ ...problems.blankProblem(), uid: 'user' });
    expect(created.id).toBe('new');
    expect(addDoc.mock.calls[0][1].CreatedDate).toBeInstanceOf(Timestamp);
    await problems.deleteCurrentProblem('new');
    expect(doc).toHaveBeenCalledWith('database', 'problems', 'new');
    expect(deleteDoc).toHaveBeenCalledWith('document');
  });

  it('preserves timestamps on updates', async () => {
    const created = Timestamp.fromDate(new Date('2021-05-04T20:54:00Z'));
    await problems.saveCurrentProblem({ ...problems.blankProblem(), id: 'one', uid: 'user', CreatedDate: created });
    const data = updateDoc.mock.calls[0][1];
    expect(data.CreatedDate).toBe(created);
    expect(data.LastUpdatedDate).toBeInstanceOf(Timestamp);
    expect(data).not.toHaveProperty('id');
  });
});
