import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  user= {
    pseudo: '',
    email: ''
  };
  u: any;

  userSub: any;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState
    .subscribe( u => {
      this.u = u;
      if(u){
        this.userSub = this.afDatabase.object("/users/"+u.uid)
        .subscribe( user => {
          this.user = user;
        })
      } else {
        this.userSub.unsubscribe();
      }
    })
  }

  resetPassword(){

    let prompt = this.alertCtrl.create({
      title: 'Mot de passe',
      message: "Entrer votre mot de passe.",
      inputs: [
        {
          name: 'oldpassword',
          placeholder: 'Mot de passe',
          type: 'password'
        },
        {
          name: 'newpassword',
          placeholder: 'Nouveau mot de passe',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            console.log(data);
       this.afAuth.auth.signInWithEmailAndPassword(this.u.email,data.oldpassword)
            .then ( () => {
              this.u.updatePassword(data.newpassword)
              .catch( () => {
                this.resetPassword();
              });
            })
            .catch ( () => {
              this.resetPassword();
            });
          }
        }
      ]
    });
    prompt.present();
  }
}