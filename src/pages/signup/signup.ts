import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email = '';
  password = '';
  pseudo = '';
  capital = '';

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private viewCtrl: ViewController, private toastCtrl: ToastController) {
  }

  signup(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(user => {
      this.afDatabase.object('users/' + user.uid).set({
        email: user.email,
        pseudo: this.pseudo,
        bankInit: this.capital
      })
      .then( () => {
        this.viewCtrl.dismiss();
      });
    })
    .catch(e => {
      let toast = this.toastCtrl.create({
        message: e.message,
        duration: 3000,
      });
      toast.present();
    });
  }

}
