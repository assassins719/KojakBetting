import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams,AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';

@IonicPage()
@Component({
  selector: 'page-pronostic-modal',
  templateUrl: 'pronostic-modal.html',
})
export class PronosticModalPage {
  capital = 1000;
  aujourdhui = "";
  user:any;
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
    benefice: 0,
    detailUser:{}
  };
  date: any;
  sports = ['Football', 'Tennis', 'Basketball', 'Rugby', 'Volleyball', 'Hockey', 'Baseball'];
  etats = ['En Attente', 'Gagné', 'Perdu'];
  isAdmin = false;

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private viewCtrl: ViewController, private NavParams: NavParams,public alertCtrl: AlertController) {
    let d=new Date();
    this.aujourdhui=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
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
        benefice : p.gain,
        detailUser:p.detailUser
      };
      if (this.NavParams.get('admin')){
        this.isAdmin = true;
      }
      this.date = p.$key;
    }
    this.afAuth.authState
      .first().subscribe(user => {
        this.pari.user = user.uid;
        this.afDatabase.object("/users/"+user.uid).subscribe(u=>{
                          this.pari.detailUser=u;
                        });
      });
  }

  calcGain(){
    if (this.pari.etat == "Gagné") {
      this.pari.gain = parseFloat(Number(parseFloat(this.pari.mise) * parseFloat(this.pari.cote)).toFixed(2));
    }else if (this.pari.etat == "Perdu"){
      this.pari.gain = 0;
    }
    if (this.pari.etat == "En attente")
      this.pari.benefice = 0;
    else{
      console.log(this.pari.etat);
      this.pari.benefice = parseFloat(Number(this.pari.gain - parseFloat(this.pari.mise)).toFixed(2));
    }
  }

  add() {
    if (!this.date) {
      this.date = new Date().getTime();
    }

    if(Number(this.pari.mise)<=this.capital){
      this.afDatabase.object("/pronostic/" + this.date).update(this.pari)
        .then(() => {
          this.viewCtrl.dismiss();
        });
    }else{
      this.errorAlert("Votre mise ne doit pas dépasser la capital qui est égal à 1000 €");
    }
  }

  errorAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: 'Pronostic non valide',
      message : message,
      buttons: ['Ok']
    });
    alert.present();
  }

}
