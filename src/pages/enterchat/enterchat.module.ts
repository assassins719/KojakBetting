import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterchatPage } from './enterchat';

@NgModule({
  declarations: [
    EnterchatPage,
  ],
  imports: [
    IonicPageModule.forChild(EnterchatPage),
  ],
  exports: [
    EnterchatPage
  ]
})
export class EnterchatPageModule {}
