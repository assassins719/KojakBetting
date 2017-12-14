import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the GuidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-administration',
  templateUrl: 'administration.html',
})
export class AdministrationPage {
  pronostic:any;
  capital=1000;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministrationPage');
     this.afAuth.authState
      .subscribe(user => {
        if (user) {
          this.afDatabase.list("/pronostic", {
                      query: {
                        orderByChild: 'user'
                      }
                    }).subscribe(paris => {
                      this.pronostic = paris;
                    });
        }
      });
  }

  postPronos(){
  	let newPronos = this.modalCtrl.create('PronosticModalPage');
    newPronos.present();
  }

  dateFormat(dateISO) {
    let d = new Date(dateISO);
    return (("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear());
  }

  editPari(pari) {
    let newPari = this.modalCtrl.create('PronosticModalPage', { 'pari': pari,'admin':true });
    newPari.present();
  }

}
