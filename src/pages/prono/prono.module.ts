import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PronoPage } from './prono';

@NgModule({
  declarations: [
    PronoPage,
  ],
  imports: [
    IonicPageModule.forChild(PronoPage),
  ],
  exports: [
    PronoPage
  ]
})
export class PronoPageModule {}
