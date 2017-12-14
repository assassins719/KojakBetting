import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { PaymentPage } from '../payment/payment';
import { GlobalVar } from '../provider/globalvar';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pronos: any;
  classement: any;
  classementBankroll = [];
  private JSObject: Object = Object;
  
  userId = "";


  constructor(public navCtrl: NavController, public globalVar:GlobalVar,public navParams: NavParams, private http: Http, public modalCtrl: ModalController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private iap: InAppPurchase) {
    this.userId = navParams.get('userId');
  }

  ionViewDidLoad() {
    this.http.get("http://kojakpronos.esy.es/jour.php")
      .subscribe(pronos => {
        this.pronos = pronos.json();
      });

    this.afAuth.authState
      .first().subscribe(user => {
        console.log(user);
        if (user) {
          // this.verif(user.uid)
          //   .then(() => {
          //   })
          //   .catch(() => {
          //   });
        }
      })


    this.afDatabase.list("/pronostic")
      .subscribe(paris => {
        let cl_tmp = paris.reduce(function (res, obj) {
          if (res[obj.user] == undefined)
            res[obj.user] = { key: obj.user, benefice: parseFloat(obj.benefice), displayName: obj.detailUser.pseudo };
          else
            res[obj.user].benefice = res[obj.user].benefice + parseFloat(obj.benefice);
          return res;
        }, []);
        cl_tmp = Object.keys(cl_tmp).map(function (k) { return cl_tmp[k] });
        this.classementBankroll = cl_tmp;

        this.classementBankroll.sort(function (x, y) {
          return y.benefice - x.benefice;
        });

      });

  }

  getweather(query) {
    this.http.get("https://apifootball.com/api/?action=get_standings&league_id=376&APIkey=7e54f8cc0bcd259200df4123f5fe1ceb8ca717db833afa6af3fd3248e73dfe19")
      .subscribe(classement => {
        this.classement = classement.json();
      });
  }

  doRefresh(refresher) {
    this.http.get("http://kojakpronos.esy.es/jour.php")
      .subscribe(pronos => {
        this.pronos = pronos.json();
        refresher.complete();
      });
  }
  // if(this.isVIP){
  //   this.navCtrl.push('PronoPage', { prono: prono });
  // }
  // else{
  //   this.navCtrl.push(PaymentPage, {
  //     userId: this.userId
  //   });
  // }
  goto(prono) {
    if (prono.vip) {
      this.afAuth.authState
        .first().subscribe(user => {
          if (!user) {
            let loginModal = this.modalCtrl.create('LoginPage');
            loginModal.present();
            loginModal.onDidDismiss(logged => {
              if (logged) {
                console.log("PersionalData", logged.uid);
                this.afDatabase.object("/users/" + logged.uid).subscribe(paris => {
                  this.globalVar.isVip = paris.vip
                  if (paris.vip) {
                    var date = paris.date;
                    if (date) {
                      var current = new Date().getMilliseconds();
                      if (date + 1000 * 60 * 60 * 24 * 30 < current) {
                        this.navCtrl.push(PaymentPage, {
                          userId: logged.uid
                        });
                      }
                      else {
                        this.navCtrl.push('PronoPage', { prono: prono });
                        console.log("call1");
                      }
                    }
                  } else {
                    this.navCtrl.push(PaymentPage, {
                      userId: logged.uid
                    });
                  }
                });
              }
            });
          } else {
            if(this.globalVar.isVip){
              this.navCtrl.push('PronoPage', { prono: prono });
            }
            else{
              this.navCtrl.push(PaymentPage, {
                userId: user.uid
              });
            }
          }
        });
    } else {
      this.navCtrl.push('PronoPage', { prono: prono });
      console.log("call3");
    }
  }

  // buy(uid) {
  //   return new Promise((resolve, reject) => {
  //     this.iap.getProducts(['KOJAKVIP37'])
  //       .then((prod) => {
  //         this.iap.subscribe(prod[0].productId)
  //           .then((res) => {
  //             this.afDatabase.object("/users/" + uid + "/vip").update({ statut: true, date: new Date().getTime() })
  //               .then(() => {
  //                 resolve();
  //               })
  //           })
  //           .catch(err => {
  //             reject(err);
  //           })
  //       });
  //   });
  // }

  // verif(uid) {
  //   return new Promise((resolve, reject) => {
  //     this.afDatabase.object("/users/" + uid)
  //       .first().subscribe(vip => {
  //         if (vip.vip) {
  //           var actual = new Date().getTime;
  //           var date = vip.date;
  //           if (date + 1000 * 3600 * 24 * 30 > actual) {
  //             this.afDatabase.object("/users/" + uid + "/vip").set(false)
  //               .then(() => {
  //                 reject();
  //               });
  //           } else {
  //             resolve();
  //           }
  //         } else {
  //           reject();
  //         }
  //       })
  //   });
  // }
}