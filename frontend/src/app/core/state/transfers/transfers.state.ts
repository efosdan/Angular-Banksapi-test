import { TransferItem } from '../../models';

export interface TransfersState {
  transfers: TransferItem[];
  error: any;
  loading: boolean;
}

export const initialState: TransfersState = {
  transfers: [],
  error: null,
  loading: false,
};
