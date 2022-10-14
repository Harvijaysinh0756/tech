import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);
  constructor(private angularFireMessaging: AngularFireMessaging) { }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log(token);
    }, (err) => {
      console.log("Unable to get permission to notify ..", err)
    });
  }

  receiveMessaging() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message recieved", payload)
      this.currentMessage.next(payload)
    })
  }
}
