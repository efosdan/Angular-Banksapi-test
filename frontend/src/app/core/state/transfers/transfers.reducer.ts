import { Action, createReducer, on } from '@ngrx/store';
import * as TransferActions from './transfers.actions';
import { initialState, TransfersState } from './transfers.state';

const transfersReducer = createReducer(
  initialState,
  // get all transfers
  on(TransferActions.fetchAllTransferItemInitiated, (state) => ({
    ...state,
    loading: true,
  })),

  on(TransferActions.fetchTransfersSuccess, (state, { transfers }) => ({
    ...state,
    transfers,
    loading: false,
  })),

  on(TransferActions.fetchTransfersFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // add transfer
  on(TransferActions.addTransferItemFormSubmitted, (state) => ({
    ...state,
    loading: true,
  })),

  on(TransferActions.addTransferItemSuccess, (state, { transfer }) => ({
    ...state,
    transfers: [...state.transfers, transfer],
    loading: false,
  })),

  on(TransferActions.addTransferItemFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // update transfers
  on(TransferActions.editTransferItemFormSubmitted, (state) => ({
    ...state,
    loading: true,
  })),

  on(TransferActions.editTransferItemSuccess, (state, { transfer }) => {
    const transferItemIndex = state.transfers.findIndex(
      (item) => item.id === transfer.id
    );
    const updatedTranferItems = [...state.transfers];
    updatedTranferItems[transferItemIndex] = transfer;
    return {
      ...state,
      transfers: updatedTranferItems,
      loading: false,
    };
  }),

  on(TransferActions.editTransferItemFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // delete transfer
  on(TransferActions.deleteTransferItemInitiated, (state) => ({
    ...state,
    loading: true,
  })),
  on(TransferActions.deleteTransferItemSuccess, (state, { transferId }) => {
    const menuItemIndex = state.transfers.findIndex(
      (item) => item.id === transferId
    );
    const updatedTransferItems = [...state.transfers];
    updatedTransferItems.splice(menuItemIndex, 1);
    return {
      ...state,
      transfers: updatedTransferItems,
      loading: false,
    };
  }),

  on(TransferActions.deleteTransferItemFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const reducer = (state: TransfersState | undefined, action: Action) =>
  transfersReducer(state, action);
