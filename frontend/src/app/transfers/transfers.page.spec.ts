import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransfersPage } from './transfers.page';
import { StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { AngularIbanModule } from 'angular-iban';
import { reducers, metaReducers } from '../core/state';

describe('TransfersPage', () => {
  let component: TransfersPage;
  let fixture: ComponentFixture<TransfersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {
          metaReducers,
        }),
        AngularIbanModule,
      ],
      declarations: [TransfersPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly the title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeNode;
    expect(title.textContent).toBe('Transfer List');
  });

  it('should properly render the title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeNode;
    expect(title.textContent).toBe('Transfer List');
  });

  it('table should be empty when empty data', () => {
    component.getData = () => [{}];
    const tableRow = fixture.debugElement.queryAll(By.css('ion-row'));
    expect(tableRow.length).toBe(2);
  });

  it('table should render the number of item correctly', () => {
    component.getData = () => [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
      {
        accountHolder: 'Efosa Daniel',
        iban: 'DE75512108001245126199',
        amount: 100,
        date: '2022-07-01T15:55:46.936Z',
        note: 'A new transfer',
        id: '048a4a03-18ff-4ed4-a239-f6b5bc82b72f',
      },
    ];
    fixture.detectChanges();
    const tableRow = fixture.debugElement.queryAll(By.css('ion-row'));
    expect(tableRow.length).toBe(4);
  });

  it('should render form properly', () => {
    component.getData = () => [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
      {
        accountHolder: 'Efosa Daniel',
        iban: 'DE75512108001245126199',
        amount: 100,
        date: '2022-07-01T15:55:46.936Z',
        note: 'A new transfer',
        id: '048a4a03-18ff-4ed4-a239-f6b5bc82b72f',
      },
    ];
    component.setOpen(true);
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('ion-modal'));

    expect(modal).toBeTruthy();
  });

  it('submit button should be disabled', () => {
    component.getData = () => [
      {
        accountHolder: 'Max Musterjunge',
        iban: 'DE75512108001245126199',
        amount: 500,
        date: '2022-07-05T15:55:46.936Z',
        note: 'A new transfer',
        id: '7ae46136-dfab-4452-b361-03c2cd6e3541',
      },
      {
        accountHolder: 'Efosa Daniel',
        iban: 'DE75512108001245126199',
        amount: 100,
        date: '2022-07-01T15:55:46.936Z',
        note: 'A new transfer',
        id: '048a4a03-18ff-4ed4-a239-f6b5bc82b72f',
      },
    ];
    // component.setOpen(true);
    fixture.detectChanges();
    spyOn(component, 'submit');
    const openModal = fixture.debugElement.query(
      By.css('#addTransaction')
    ).nativeElement;
    openModal.click();

    expect(component.submit).toHaveBeenCalledTimes(0);
  });
});
