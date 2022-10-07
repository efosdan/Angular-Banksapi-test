import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as TransferReducer from './transfers/transfers.reducer';

export const reducers: ActionReducerMap<State> = {
  transfers: TransferReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
