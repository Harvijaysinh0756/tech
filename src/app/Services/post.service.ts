import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private db: AngularFirestore) { }

  getAllPost() {
    return new Promise<any>((resolve) => {
      this.db.collection('posts').valueChanges({ idField: 'id' }).subscribe(users => resolve(users))
    })
  }

  getsinglepost(id:any) {
    return new Promise<any>((resolve) => {
      this.db.collection('posts').doc(id).valueChanges().subscribe(editpost => resolve(editpost))
    })
  }

  getsingleUser(id:any) {
    return new Promise<any>((resolve) => {
      this.db.collection('users').doc(id).valueChanges().subscribe(users => resolve(users))
    })
  }
  

  deletePost(id:any) {
    this.db.doc(`posts/${id}`).delete();
    }
 
    updatePostId(id:any,obj) {
        this.db.doc(`posts/${id}`).update(obj);
    }
    updateUserid(id:any,obj) {
        this.db.doc(`users/${id}`).update(obj);
    }
}

