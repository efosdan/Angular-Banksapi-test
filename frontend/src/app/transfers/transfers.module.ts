import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransfersPage } from './transfers.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularIbanModule } from 'angular-iban';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransferRoutingModule,
    ReactiveFormsModule,
    AngularIbanModule,
  ],
  declarations: [TransfersPage],
})
export class TransfersPageModule {}
