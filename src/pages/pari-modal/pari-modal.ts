import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';

@IonicPage()
@Component({
  selector: 'page-pari-modal',
  templateUrl: 'pari-modal.html',
})
export class PariModalPage {
  pari = {
    intitule: '',
    sport: 'Football',
    cote: '',
    mise: '',
    etat: 'En attente',
    live: false,
    user: '',
    date: new Date().toISOString(),
    gain: 0,
    benefice: 0
  };
  date: any;
  sports = ['Football', 'Tennis', 'Basketball', 'Rugby', 'Volleyball', 'Hockey', 'Baseball'];
  etats = ['En Attente', 'Gagné', 'Perdu'];

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private viewCtrl: ViewController, private NavParams: NavParams) {
  }

  ionViewDidLoad() {
    if (this.NavParams.get('pari')) {
      let p = this.NavParams.get('pari');
      this.pari = {
        intitule: p.intitule,
        sport: p.sport,
        cote: p.cote,
        mise: p.mise,
        etat: p.etat,
        live: p.live,
        user: p.user,
        date: p.date,
        gain: p.gain,
        benefice : p.gain
      };
      this.date = p.$key;
    }
    this.afAuth.authState
      .first().subscribe(user => {
        this.pari.user = user.uid;
      })
  }

  calcGain(){
    if (this.pari.etat == "Gagné") {
      this.pari.gain = parseFloat(this.pari.mise) * parseFloat(this.pari.cote);
    }else if (this.pari.etat == "Perdu"){
      this.pari.gain = 0;
    }
    if (this.pari.etat == "En Attente")
      this.pari.benefice = 0;
    else
      this.pari.benefice = this.pari.gain - parseFloat(this.pari.mise);
  }

  add() {
    if (!this.date) {
      this.date = new Date().getTime();
    }

    this.afDatabase.object("/paris/" + this.date).update(this.pari)
      .then(() => {
        this.viewCtrl.dismiss();
      });
  }

}
