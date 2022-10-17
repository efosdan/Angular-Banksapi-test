import { selectTransferItems, isLoading } from './transfers.selector';
import { State } from '../core.state';

const createState = (): State => ({
  transfers: {
    error: null,
    loading: true,
    transfers: [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
    ],
  },
});

describe('trasnfer selectore', () => {
  it('should get all transfers', () => {
    const state = createState();
    const transfers = selectTransferItems(state);
    expect(transfers.length).toBe(1);
  });

  it('should get loading state', () => {
    const state = createState();
    const transfers = isLoading(state);
    expect(transfers).toEqual(true);
  });
});
