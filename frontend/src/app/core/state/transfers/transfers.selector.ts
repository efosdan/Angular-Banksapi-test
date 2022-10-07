import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransfersState } from './transfers.state';

export const selectTransfers =
  createFeatureSelector<TransfersState>('transfers');

export const selectTransferItems = createSelector(
  selectTransfers,
  (state: TransfersState) => state.transfers
);

export const filteredTransfers = (value) =>
  createSelector(selectTransferItems, (transfers) =>
    transfers.filter((item) =>
      item.accountHolder.toLowerCase().includes(value.toLowerCase())
    )
  );

export const selectTransferItem = (props: { id: string }) =>
  createSelector(selectTransferItems, (transfers) =>
    transfers.find((transfer) => transfer.id === props.id)
  );

export const isLoading = createSelector(
  selectTransfers,
  (state: TransfersState) => state.loading
);
