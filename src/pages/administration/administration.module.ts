import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrationPage } from './administration';

@NgModule({
  declarations: [
    AdministrationPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministrationPage),
  ],
  exports: [
    AdministrationPage
  ]
})
export class AdministrationPageModule {}
