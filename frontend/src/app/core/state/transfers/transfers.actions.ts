import { createAction, props } from '@ngrx/store';
import { TransferItem } from '../../models';

// fetch transfers actions
export const fetchAllTransferItemInitiated = createAction(
  '[Get all Transfers] get all transfer Item initiated'
);

export const fetchTransfersSuccess = createAction(
  '[Transfer API] Fetch Transfers Success',
  props<{ transfers: TransferItem[] }>()
);

export const fetchTransfersFailed = createAction(
  '[Transfer API] Fetch Transfer Failed',
  props<{ error: any }>()
);

// add trtansfers actions
export const addTransferItemFormSubmitted = createAction(
  '[Add Transfer item] Add Transfer Item Form Submitted',
  props<{ transfer: TransferItem }>()
);

export const addTransferItemSuccess = createAction(
  '[Transfer API] Add Transfer Item Success',
  props<{ transfer: TransferItem }>()
);

export const addTransferItemFailed = createAction(
  '[Transfer API] Add Transfer Item Failed',
  props<{ error: any }>()
);

// edit transfer item
export const editTransferItemFormSubmitted = createAction(
  '[Edit Transfer item] Edit transfer item submited',
  props<{ transfer: TransferItem }>()
);

export const editTransferItemSuccess = createAction(
  '[Transfer API] Edit Transfer Item Success',
  props<{ transfer: TransferItem }>()
);

export const editTransferItemFailed = createAction(
  '[Transfer API] Edit Transfer Item Failed',
  props<{ error: any }>()
);

// delete item
export const deleteTransferItemInitiated = createAction(
  '[Delete Transfer item] Delete Transfer item initiated',
  props<{ transferId: string }>()
);

export const deleteTransferItemSuccess = createAction(
  '[Transfer API] Delete Transfer Item Success',
  props<{ transferId: string }>()
);

export const deleteTransferItemFailed = createAction(
  '[Transfer API] Delete Transfer Item Failed',
  props<{ error: any }>()
);
