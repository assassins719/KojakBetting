import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
/**
 * Generated class for the EntrerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-entrer',
  templateUrl: 'entrer.html',
})
export class EntrerPage {
username: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  loginUser() {
        if(/^[a-zA-Z0-9]+$/.test(this.username)) {
            // all cool
            this.navCtrl.push(ChatPage, {
                username: this.username
            });
        } else {
            
        }
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrerPage');
  }

}
