import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController } from 'ionic-angular';


import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-chat',
  templateUrl: 'enterchat.html'
})
export class EnterchatPage {

    username: string = '';

  constructor(public navCtrl: NavController,
      private alertCtrl: AlertController) {

  }

    showAlert(title: string, message: string) {
      let alertBox = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
      alertBox.present();
    }

    loginUser() {
        if(/^[a-zA-Z0-9]+$/.test(this.username)) {
            // all cool
            this.navCtrl.push(ChatPage, {
                username: this.username
            });
        } else {
            this.showAlert('Error', 'Invalid Username');
        }
    }

}
