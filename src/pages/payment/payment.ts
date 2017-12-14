import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

import { Http, Headers } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import {GlobalVar} from '../provider/globalvar';
/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  money_amount = 10;
  strip_key = "pk_test_XcMPYQK0DxxOzvW0EvhJvw6n";
  SERVER_URL = "https://us-central1-kojak-pronos.cloudfunctions.net/api";
  userId = "";
  date = new Date().getTime();
  constructor(public navCtrl: NavController, public globalVar:GlobalVar, public navParams: NavParams, public stripe: Stripe, public http: Http, private afDatabase: AngularFireDatabase) {
    this.userId = navParams.get('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  pay() {
 
    this.stripe.setPublishableKey(this.strip_key);
    this.stripe.createCardToken(this.cardinfo).then((token) => {

      var data = { stripetoken: token, amount: this.money_amount };
      var headers = new Headers();
      headers.append('Conent-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.SERVER_URL + "/processpay", data, { headers: headers }).subscribe((res) => {
        let body = res['_body'];
        let jBody = JSON.parse(body)
        if (jBody.success == true) {
          this.globalVar.isVip = true;
          console.log(this.date);
          alert('Charged Successfully!')
          this.navCtrl.pop();          
          this.setVip();
        } else {
          console.log(res);
          alert('Charge Failed! Please try again')
        }
      })
    })
  }
  
  setVip() {
    this.afDatabase.object("/users/" + this.userId).subscribe(userdata => {
      var vipdata = userdata;
      vipdata.vip = true;      
      vipdata.date = this.date;
      this.afDatabase.object('users/' + this.userId).set(vipdata)
        .then(() => {
        });
      console.log(vipdata)
    });
  }

}
