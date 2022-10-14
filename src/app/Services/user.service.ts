import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { first } from 'rxjs/operators'
// import { auth } from 'firebase/compat/app'

interface user {
  username: string,
  uid: string
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: user

  constructor(private afAuth: AngularFireAuth) { }

  getUID(): string {
    console.log("sadfasdf",this.user.uid);
		return this.user.uid
	}
  
}
