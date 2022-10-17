import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { Store } from '@ngrx/store';
import {
  addTransferItemFormSubmitted,
  editTransferItemFormSubmitted,
  deleteTransferItemInitiated,
  selectTransferItems,
} from 'src/app/core/state/transfers';
import { validateDate } from '../../utils/dateValidator';
import { Actions, ofType } from '@ngrx/effects';
import * as TransferActions from 'src/app/core/state/transfers';

@Component({
  selector: 'app-tabs',
  templateUrl: 'transfers.page.html',
  styleUrls: ['transfers.page.scss'],
})
export class TransfersPage {
  search = '';
  isModalOpen = false;
  item = null;
  public transferItems = [];
  public ibanReactive: FormControl;
  private transferForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    updates$: Actions
  ) {
    this.store.select(selectTransferItems).subscribe((transfers) => {
      this.transferItems = transfers;
    });
    this.transferForm = this.formBuilder.group({
      accountHolder: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.min(50), Validators.max(20000000)],
      ],
      iban: ['', [Validators.required, ValidatorService.validateIban]],
      date: ['', [Validators.required, validateDate]],
      note: [''],
    });

    updates$
      .pipe(
        ofType(
          TransferActions.addTransferItemSuccess,
          TransferActions.editTransferItemSuccess
        )
      )
      .subscribe(() => {
        this.setOpen(false);
      });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (!isOpen) {
      this.resetForm();
    }
  }

  getData() {
    return [...this.transferItems]
      .filter(
        (item) =>
          item.accountHolder
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          item.note.toLowerCase().includes(this.search.toLowerCase())
      )
      .sort(
        (a, b) =>
          Number(new Date(a.date)) - Number(new Date(b.date)) ||
          Number(a.amount) - Number(b.amount)
      );
  }

  submit() {
    if (this.item) {
      this.store.dispatch(
        editTransferItemFormSubmitted({
          transfer: { ...this.transferForm.value, id: this.item.id },
        })
      );
    } else {
      this.store.dispatch(
        addTransferItemFormSubmitted({
          transfer: {
            ...this.transferForm.value,
            date: new Date(this.transferForm.value.date),
          },
        })
      );
    }
  }

  editTransfer(item) {
    this.item = item;
    for (const key in item) {
      if (key !== 'id') {
        if (key === 'date') {
          const date = new Date(item[key]).toLocaleDateString('en-CA');

          this.transferForm.controls[key].setValue(date);
        } else {
          this.transferForm.controls[key].setValue(item[key]);
        }
      }
    }
    this.setOpen(true);
  }

  resetForm() {
    ['accountHolder', 'date', 'iban', 'note', 'amount'].forEach((key) => {
      this.transferForm.controls[key].setValue('');
    });
    this.item = null;
  }
  deleteTransferItem(id: string): void {
    this.store.dispatch(deleteTransferItemInitiated({ transferId: id }));
  }

  formatErrorMessage(name, error) {
    if (error.required) {
      return name + ' is required';
    }
    if (error.iban) {
      return 'invalid IBAN';
    }
    if (error.min) {
      return name + ' must be at least ' + error.min.min;
    }

    if (error.max) {
      return name + ' must not be greater than ' + error.max.max;
    }
    if (error.validateDate) {
      return name + ' must not be in the past ';
    }
    return name + ' is not valid';
  }
}
