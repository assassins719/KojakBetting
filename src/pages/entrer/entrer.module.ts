import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntrerPage } from './entrer';

@NgModule({
  declarations: [
    EntrerPage,
  ],
  imports: [
    IonicPageModule.forChild(EntrerPage),
  ],
  exports: [
    EntrerPage
  ]
})
export class EntrerPageModule {}
