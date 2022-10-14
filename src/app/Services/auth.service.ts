import { Injectable } from '@angular/core';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   postRef: AngularFirestoreCollection;
  constructor(public afAuth: AngularFireAuth,
    public router: Router, private afs: AngularFirestore
   ) { this.postRef = this.afs.collection<any>('users')}

  // FacebookAuth()
  // {
  //   return this.AuthLogin(new FacebookAuthProvider())
  // }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.user.uid}`);
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          profilepic: result.user.photoURL
        };
        
        localStorage.setItem('userDetail', JSON.stringify(userData));
        userRef.set(userData, {
          merge: true,
        });

        // console.log(result);
        // console.log(result.user.uid);
        // const userobj : any = {
        //  uid : result.user.uid,
        //  name : result.user.displayName,
        //  email : result.user.email,
        //  profilepic : result.user.photoURL
        // }
        // console.log(result.user.email);
        // localStorage.setItem('userDetail', JSON.stringify({
        //   uid : userobj.uid,
        //   name: userobj.name,
        //   email: userobj.email,
        //   profilepic: userobj.profilepic
        // }))
        // this.afs.collection<any>(`users/${userobj.uid}`).add(userobj).then(_ => {
        //   console.log("User Addded : ", userobj);
        //   this.router.navigate(['landingpage'])
        // }).catch(error => {
        //   console.log("User error : ", error);
        // });
        if (result) {
          this.router.navigate(['landingpage'])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      // window.alert('Logged out!');
      if(confirm("Are You Sure To Logged Out"))
      {
        this.router.navigate(['/'])
      }
    });

  }

}
