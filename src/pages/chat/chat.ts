import { AngularFireAuthModule } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];

  constructor(public db: AngularFireDatabase, private authf:AngularFireAuthModule,
    public navCtrl: NavController, public navParams: NavParams) {
      this.username = this.navParams.get('username');
      this._chatSubscription = this.db.list('/chat').subscribe( data => {
        this.messages = data;
        this.scrolltobottom();
      });
      
    }




    sendMessage() {
      this.db.list('/chat').push({
        username: this.username,
        message: this.message
      }).then( () => {
        // message is sent
      });
      this.message = '';
    }
scrolltobottom(){
  this.content.scrollTo(0, this.content.getContentDimensions().scrollHeight, 300);
}
    ionViewDidLoad() {
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has joined the room`
      });
      this.scrolltobottom();
    }

    ionViewWillLeave(){
      this._chatSubscription.unsubscribe();
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has left the room`
      });
    }
  }
