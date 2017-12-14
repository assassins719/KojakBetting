import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankRollInitPage } from './bank-roll-init';

@NgModule({
  declarations: [
    BankRollInitPage,
  ],
  imports: [
    IonicPageModule.forChild(BankRollInitPage),
  ],
  exports: [
    BankRollInitPage
  ]
})
export class BankRollInitPageModule {}
