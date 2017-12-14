import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-bank-roll-init',
  templateUrl: 'bank-roll-init.html',
})
export class BankRollInitPage {
  bankroll={
    montant : 0,
    date : new Date().toISOString()
  }

  constructor(private viewCtrl: ViewController, private afDatabase: AngularFireDatabase,  private NavParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  validate(){
    this.afDatabase.object("/users/"+this.NavParams.get('uid')+"/bankInit").update(this.bankroll)
    .then( () => {
      this.viewCtrl.dismiss();
    })
  }

}
