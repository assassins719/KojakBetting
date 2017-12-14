import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankrollPage } from './bankroll';

@NgModule({
  declarations: [
    BankrollPage,
  ],
  imports: [
    IonicPageModule.forChild(BankrollPage),
  ],
  exports: [
    BankrollPage
  ]
})
export class BankrollPageModule {}
