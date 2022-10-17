import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TransfersEffects } from './transfers.effects';
import { ApiService } from '../../services';

describe('Transfer Effect', () => {
  let actions$: Observable<Action>;
  let effects: TransfersEffects;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TransfersEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getTransfers',
            'addTransfer',
            'updateTransfer',
            'deleteTransfer',
          ]),
        },
      ],
    });
    effects = TestBed.inject<TransfersEffects>(TransfersEffects);
    service = TestBed.inject<ApiService>(ApiService);
  }));

  it('should dispatch fetchTransfer and call fetchTransfersSuccess function', () => {
    const data = [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
    ];

    service.getTransfers.and.returnValue(of(data));
    const type = '[Get all Transfers] get all transfer Item initiated';
    actions$ = of({ type });

    effects.fetchTransfer$.subscribe((action) => {
      expect(action.type).toBe('[Transfer API] Fetch Transfers Success');
    });
  });

  it('should add a transfer', () => {
    const data = [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
    ];

    service.addTransfer.and.returnValue(of(data));
    const type = '[Transfer API] Add Transfer Item Success';
    actions$ = of({ type });

    effects.addTransfer$.subscribe((action: any) => {
      expect(action.type).toBe(type);
      expect(action.transfer).toEqual(data);
    });
  });

  it('should update a transfer', () => {
    const data = [
      {
        accountHolder: 'New Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 400,
        date: '2022-07-05T15:55:46.936Z',
        note: 'Latest transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
    ];

    service.updateTransfer.and.returnValue(of(data));
    const type = '[Transfer API] Edit Transfer Item Success';
    actions$ = of({ type });

    effects.updateTransfer$.subscribe((action: any) => {
      expect(action.type).toBe(type);
      expect(action.transfer).toEqual(data);
    });
  });

  it('should delete a transfer', () => {
    const data =
      'transfer with id 7ae46136-dfab-4452-b361-03c2cd6e3541 has been deleted';

    service.deleteTransfer.and.returnValue(of(data));
    const type = '[Transfer API] Edit Transfer Item Success';
    actions$ = of({ type });

    effects.deleteTransfer$.subscribe((action: any) => {
      expect(action.type).toBe(type);
      expect(action.transfer).toEqual(data);
    });
  });
});
