import { initialState, TransfersState } from './transfers.state';
import { reducer as transferReducer } from './transfers.reducer';
import * as TransferActions from './transfers.actions';

describe('Transfer Reducer', () => {
  it('should fetch transfer initiated and set loading to true', () => {
    const action = TransferActions.fetchAllTransferItemInitiated();
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(true);
  });

  it('should fetch transfer success', () => {
    const transfers = [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
    ];
    const action = TransferActions.fetchTransfersSuccess({ transfers });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.transfers).toEqual(transfers);
  });

  it('should properly set the failed state', () => {
    const error = 'Failed to fetch transfers';
    const action = TransferActions.fetchTransfersFailed({ error });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(error);
  });

  it('should add transfer submitted and set loading to true', () => {
    const transfer = {
      accountHolder: 'Max Musterjunge',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
    };
    const action = TransferActions.addTransferItemFormSubmitted({ transfer });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(true);
  });

  it('should successfully add created transfer to store', () => {
    const transfer = {
      accountHolder: 'Max Musterjunge',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
    };
    const action = TransferActions.addTransferItemSuccess({ transfer });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.transfers[0]).toEqual(transfer);
  });

  it('should add error state for creating transfer', () => {
    const error = 'Failed to create';
    const action = TransferActions.addTransferItemFailed({ error });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(error);
  });

  it('should update transfer and set loading to true', () => {
    const transfer = {
      accountHolder: 'John Doe',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
      id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
    };
    const action = TransferActions.editTransferItemFormSubmitted({ transfer });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(true);
  });

  it('should successfully add updated transfer to store', () => {
    const transfer = {
      accountHolder: 'John Doe',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
      id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
    };
    const action = TransferActions.editTransferItemSuccess({ transfer });
    const state = transferReducer(
      { ...initialState, transfers: [transfer] },
      action
    );
    expect(state.loading).toEqual(false);
    expect(state.transfers[0]).toEqual(transfer);
  });

  it('should add error state for updating transfer', () => {
    const error = 'Failed to update';
    const action = TransferActions.editTransferItemFailed({ error });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(error);
  });

  it('should delete transfer and set loading to true', () => {
    const transferId = '7ae46136-dfab-4452-b361-03c2cd6e3541';
    const action = TransferActions.deleteTransferItemInitiated({ transferId });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(true);
  });

  it('should successfully delete a transfer item from store', () => {
    const transfer = {
      accountHolder: 'John Doe',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
      id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
    };
    const action = TransferActions.deleteTransferItemSuccess({
      transferId: transfer.id,
    });
    const state = transferReducer(
      { ...initialState, transfers: [transfer] },
      action
    );
    expect(state.loading).toEqual(false);
    expect(state.transfers.length).toEqual(0);
  });

  it('should add error state for deleting a transfer item', () => {
    const error = 'Failed to delete';
    const action = TransferActions.deleteTransferItemFailed({ error });
    const state = transferReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(error);
  });
});
