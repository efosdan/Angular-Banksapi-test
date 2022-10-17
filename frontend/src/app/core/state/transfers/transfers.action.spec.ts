import * as TransferActions from './transfers.actions';

describe('TransferActions', () => {
  it('should create a fetchAllTransferItemInitiated action', () => {
    const action = TransferActions.fetchAllTransferItemInitiated();
    expect(action.type).toEqual(
      '[Get all Transfers] get all transfer Item initiated'
    );
  });

  it('should create a fetchTransfersSuccess action', () => {
    const payload = [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
    ];
    const action = TransferActions.fetchTransfersSuccess({
      transfers: payload,
    });
    expect({ ...action }).toEqual({
      type: '[Transfer API] Fetch Transfers Success',
      transfers: payload,
    });
  });

  it('should create a fetchTransfersFailed action', () => {
    const payload = 'An error occured while fetching';
    const action = TransferActions.fetchTransfersFailed({
      error: payload,
    });
    expect({ ...action }).toEqual({
      type: '[Transfer API] Fetch Transfer Failed',
      error: payload,
    });
  });

  it('should create a addTransferItemFormSubmitted action', () => {
    const payload = {
      accountHolder: 'Max Musterjunge',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
    };
    const action = TransferActions.addTransferItemFormSubmitted({
      transfer: payload,
    });
    expect({ ...action }).toEqual({
      type: '[Add Transfer item] Add Transfer Item Form Submitted',
      transfer: payload,
    });
  });

  it('should create a addTransferItemSuccess action', () => {
    const payload = {
      accountHolder: 'Max Musterjunge',
      iban: 'DE75512108001245126199',
      amount: 500,
      date: '2022-07-05T15:55:46.936Z',
      note: 'A new transfer',
      id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
    };
    const action = TransferActions.addTransferItemSuccess({
      transfer: payload,
    });
    expect({ ...action }).toEqual({
      type: '[Transfer API] Add Transfer Item Success',
      transfer: payload,
    });
  });

  it('should create a addTransferItemFailed action', () => {
    const payload = 'failed';
    const action = TransferActions.addTransferItemFailed({
      error: payload,
    });
    expect({ ...action }).toEqual({
      type: '[Transfer API] Add Transfer Item Failed',
      error: payload,
    });
  });
});
