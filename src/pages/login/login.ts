import { Component } from '@angular/core';
import { IonicPage, ModalController, ViewController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private afAuth: AngularFireAuth, public modalCtrl: ModalController, private toastCtrl: ToastController, private viewCtrl: ViewController) {
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.viewCtrl.dismiss(user);
      })
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: e.message,
          duration: 3000,
        });
        toast.present();
      });
  }

  signup() {
    let signupModal = this.modalCtrl.create('SignupPage');
    this.viewCtrl.dismiss();
    signupModal.present();
  }

}
