import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { PaymentPage } from '../payment/payment';
import { GlobalVar } from '../provider/globalvar';
@IonicPage()
@Component({
	selector: 'page-prono',
	templateUrl: 'prono.html',
})
export class PronoPage {
	public prono: any;
	public uid = "";
	public isFollowed: boolean;


	constructor(public toastCtrl: ToastController, public globalVar:GlobalVar,public navCtrl: NavController, public navParams: NavParams, private http: Http, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public alertCtrl: AlertController, private modalCtrl: ModalController) {
	}

	ionViewDidLoad() {
		this.isFollowed = false;
		this.prono = this.navParams.get('prono');
		let inti = this.prono.equipe1 + "-" + this.prono.equipe2;
		this.afAuth.authState
			.first().subscribe(user => {
				if (user) {
					
					this.uid = user.uid;
					
					this.afDatabase
						.list("/paris", {
							query: {
								orderByChild: 'user',
								equalTo: this.uid
							}
						})
						.subscribe(data => {
							data = data.filter(item => item.intitule === inti);
							if (data.length != 0) {
								this.isFollowed = true;
							}
						});
				}
			});
	}

	parier(pro: any) {
		this.afAuth.authState
		.first().subscribe(user => {
			if (!user) {
				let loginModal = this.modalCtrl.create('LoginPage');
				loginModal.present();
				loginModal.onDidDismiss(logged => {
					if (logged) {
						console.log("PersionalData", logged.uid);
						this.afDatabase.object("/users/" + logged.uid).subscribe(paris => {
							this.globalVar.isVip = paris.vip;
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
										this.showdialog(pro);
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
					this.showdialog(pro);
				}
				else{
					this.navCtrl.push(PaymentPage, {
						userId: user.uid
					});
				}
			}
		});

		
	}
	showdialog(pro: any){
		let pari = {
			intitule: pro.equipe1 + "-" + pro.equipe2,
			sport: pro.sport,
			cote: pro.cote,
			mise: pro.mise,
			etat: 'En attente',
			live: false,
			user: '',
			date: new Date().toISOString(),
			gain: pro.mise * pro.cote,
			benefice: pro.mise * pro.cote - pro.mise
		};

		pari.gain = Number(Number(pari.gain).toFixed(2));
		pari.benefice = Number(Number(pari.benefice).toFixed(2));
		if (this.uid != "") {
			pari.user = this.uid;
			console.log(pro);
			console.log(pari);
			this.presentPrompt(pari);
		} else {

		}
	}

	inviteLogin(pari: any) {
		let login = this.modalCtrl.create('LoginPage');
		login.onDidDismiss(data => {
			if (data != undefined) {
				pari.user = data.uid;
				this.afDatabase
					.list("/paris", {
						query: {
							orderByChild: 'user',
							equalTo: data.uid
						}
					})
					.subscribe(data => {
						data = data.filter(item => item.intitule === pari.intitule);
						if (data.length == 0 && this.uid == "") {
							this.presentPrompt(pari);
						} else {
							this.isFollowed = true;
						}
					});
			}
		});
		login.present();
	}


	presentPrompt(pari: any) {
		const alert = this.alertCtrl.create({
			title: pari.intitule,
			message: 'Quelle est la mise pour votre pari?',
			inputs: [
				{
					name: 'mise',
					placeholder: 'Votre mise',
					type: "number",
					value: pari.mise
				}
			],
			buttons: [
				{
					text: 'Annuler',
					role: 'cancel',
					handler: data => {

					}
				},
				{
					text: 'Parier',
					handler: data => {
						if (!isNaN(data.mise)) {
							pari.mise = data.mise;
							pari.gain = Number(pari.mise * pari.cote).toFixed(2);
							pari.benefice = Number(pari.mise * pari.cote - pari.mise).toFixed(2);
							console.log(pari);
							this.afDatabase.list("/paris/").push(pari)
								.then(() => {
									const toast = this.toastCtrl.create({
										message: 'Le pronostic a été ajouté à votre bankroll',
										duration: 3000,
										position: 'bottom'
									});
									toast.present();
									this.isFollowed = true;
								});
						} else {

						}
					}
				}
			]
		});
		alert.present();
	}

	bankroll() {
		this.navCtrl.push('BankrollPage');
	}

}

//ea59102c
