import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PronosticModalPage } from './pronostic-modal';

@NgModule({
  declarations: [
    PronosticModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PronosticModalPage),
  ],
  exports: [
    PronosticModalPage
  ]
})
export class PronosticModalPageModule {}
