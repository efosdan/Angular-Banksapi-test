import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services';
import * as TransferActions from './transfers.actions';

@Injectable()
export class TransfersEffects {
  fetchTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferActions.fetchAllTransferItemInitiated),
      switchMap(() =>
        this.apiService.getTransfers().pipe(
          map((transfers) =>
            TransferActions.fetchTransfersSuccess({ transfers })
          ),
          catchError((error) => {
            console.log(error);
            return of(TransferActions.fetchTransfersFailed({ error }));
          })
        )
      )
    )
  );

  addTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferActions.addTransferItemFormSubmitted),
      switchMap((action) =>
        this.apiService.addTransfer(action.transfer).pipe(
          map((transfer) =>
            TransferActions.addTransferItemSuccess({ transfer })
          ),
          catchError((error) =>
            of(TransferActions.addTransferItemFailed({ error }))
          )
        )
      )
    )
  );

  updateTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferActions.editTransferItemFormSubmitted),
      switchMap((action) =>
        this.apiService.updateTransfer(action.transfer).pipe(
          map((transfer) =>
            TransferActions.editTransferItemSuccess({ transfer })
          ),
          catchError((error) =>
            of(TransferActions.editTransferItemFailed({ error }))
          )
        )
      )
    )
  );

  deleteTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferActions.deleteTransferItemInitiated),
      switchMap((action) =>
        this.apiService.deleteTransfer(action.transferId).pipe(
          map(() =>
            TransferActions.deleteTransferItemSuccess({
              transferId: action.transferId,
            })
          ),
          catchError((error) =>
            of(TransferActions.deleteTransferItemFailed({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions<any>, private apiService: ApiService) {}
}
