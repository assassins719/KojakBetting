import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PariModalPage } from './pari-modal';

@NgModule({
  declarations: [
    PariModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PariModalPage),
  ],
  exports: [
    PariModalPage
  ]
})
export class PariModalPageModule {}
