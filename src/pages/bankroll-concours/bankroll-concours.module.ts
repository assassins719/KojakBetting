import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankrollConcoursPage } from './bankroll-concours';

@NgModule({
  declarations: [
    BankrollConcoursPage,
  ],
  imports: [
    IonicPageModule.forChild(BankrollConcoursPage),
  ],
  exports: [
    BankrollConcoursPage
  ]
})
export class BankrollConcoursPageModule {}
