import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
Chart.defaults.global.defaultFontColor = '#fff';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()

@Component({
  selector: 'page-bankroll-concours',
  templateUrl: 'bankroll-concours.html',
})
export class BankrollConcoursPage {
  pronostic: any;
  uid: any;
  paris: any;
  bankInit: any;
   gain=0;
  benefice=0;
  capital=1000;
  stat= {
    gagne : 0,
    perdu : 0,
    encours : 0,
    paritotal : 0,
    capital: 1000,
    misetotal: 0,
    beneftotal:0,
    roi: 0,
    capitalactu: 0,
    miseencours: 0,
    taux: 0,
    prog: 0,
    misemoy: 0,
    cotemoy: 0,
    cotetotal: 0

  }
  

  subParis: any;
  subInit: any;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState
      .subscribe(user => {
        if (user) {

          this.uid = user.uid;
          this.subInit = this.afDatabase.object("/pronostic/" + this.uid)
            .subscribe(user => {
              if (!user.bankInit) {
                this.bankInit = 0;
              } else {
                this.bankInit = user.bankInit;
              }

              this.subParis = this.afDatabase.list("/pronostic", {
                query: {
                  orderByChild: 'user',
                  equalTo: this.uid
                }
              }).subscribe(paris => {
                this.paris = paris;
                this.paris.sort(function (a, b) {
                  return a.date > b.date;
                });
                var labels = ["Départ"];
                var data = [parseFloat(this.bankInit)]
                var last = data[0];
                this.stat= {
                  gagne : 0,
                  perdu : 0,
                  encours : 0,
                  paritotal : 0,
                  capital : parseFloat(this.bankInit),
                  misetotal : 0,
                  beneftotal : 0,
                  roi: 0,
                  capitalactu: 0,
                  miseencours: 0,
                  taux: 0,
                  prog: 0,
                  misemoy: 0,
                  cotemoy: 0,
                  cotetotal: 0
                }
                this.paris.forEach(elem => {
                  if (elem.etat == "Gagné") this.stat.gagne++;
                  if (elem.etat == "Perdu") this.stat.perdu++;
                  if (elem.etat == "En Attente") {
                    this.stat.encours++;
                    this.stat.miseencours = this.stat.miseencours + parseFloat(elem.mise);
                  }
                  else {
                    labels.push(this.dateFormat(elem.date));
                    data.push(last + parseFloat(elem.benefice));
                    last = last + parseFloat(elem.benefice);
                  }
                  this.stat.cotetotal = this.stat.cotetotal + parseFloat(elem.cote)
                  this.stat.misetotal = this.stat.misetotal + parseFloat(elem.mise);
                  this.stat.beneftotal = this.stat.beneftotal + parseFloat(elem.benefice);
                });
                this.stat.paritotal = this.paris.length;
                this.stat.roi = this.stat.beneftotal / this.stat.misetotal * 100 ;
                this.stat.capitalactu = 1000 + this.stat.beneftotal;
                this.stat.taux = this.stat.gagne / this.stat.paritotal;
                this.stat.prog = ((this.stat.capitalactu - this.stat.capital) / this.stat.capital )* 100;
                this.stat.misemoy = this.stat.misetotal / this.stat.paritotal;
                this.stat.cotemoy = this.stat.cotetotal / this.stat.paritotal;

                this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                  type: 'line',
                  data: {
                    labels: labels,
                    datasets: [
                      {
                        label: "BankRoll",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(234,181,54,0.4)",
                        borderColor: "rgba(234,181,54,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        
                        
                     
                        pointBackgroundColor: "red",
                        pointBorderColor: "rgba(220,220,220,1)",
                        pointBorderWidth: 3,
                        pointLabelFontSize: 100,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(212,20,57,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data,
                        spanGaps: false,
                      }
                    ]
                  }
                });
                this.paris.reverse();
              });
            });
        } else {
          this.subInit.unsubscribe();
          this.subParis.unsubscribe();
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

}


