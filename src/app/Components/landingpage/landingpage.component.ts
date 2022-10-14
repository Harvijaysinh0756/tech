
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']

})
export class LandingpageComponent implements OnInit {
  message: any;
  reaction: any = [];
  allPost = [];
  pattern = /(#\w+)/gm;

  react: any;

  heartType: string = "favorite_border"
  togglebutton: boolean = true;
  toggle: boolean = true;
  togglebuttonthumpUp: boolean = true;
  // reaction
  postID: string;
  postReference: AngularFirestoreDocument;
  sub;
  post;

  userdata = JSON.parse(localStorage.getItem('userDetail'));

  constructor(
    private Post: PostService,
    //  private messagingservice: MessagingService,
    private afc: AngularFirestore,

  ) { }

  ngOnInit(): void {
    // this.requestPermission();
    // this.listen();
    this.Getallpost();
  }

  Getallpost() {
    this.Post.getAllPost().then(res => {
      this.allPost = res;
      console.log("all post data", this.allPost);
    });
  }
  // messaging
  // requestPermission() {
  //   const messaging = getMessaging();
  //   getToken(messaging,
  //     { vapidKey: environment.firebase.vapidKey }).then(
  //       (currentToken) => {
  //         if (currentToken) {
  //           console.log("Hurraaa!!! we got the token.....");
  //           console.log(currentToken);
  //         } else {
  //           console.log('No registration token available. Request permission to generate one.');
  //         }
  //       }).catch((err) => {
  //         console.log('An error occurred while retrieving token. ', err);
  //       });
  // }
  // listen() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     this.message = payload;
  //   });
  // }













  //hstagshow
  public removeTags(input: string): string {
  return input.replace(/(#\w+)/gm, '').trim();
}
effect(postid, key) {
  this.postReference = this.afc.doc(`posts/${postid}`)
  this.react = this.userdata.uid.concat(key)
  console.log("kjhgfdghj", this.react)

  this.Post.getsinglepost(postid).then(val => {
    this.post = val;
    console.log("hjgf", this.post)
    let recarr = []
    let indexx = this.post.reaction.forEach((element) => {
      console.log(element)
      let str = element
      str = str.slice(0, str.length - 1)
      console.log(str);
      console.log(element);
      //  console.log(react);
      if (str !== this.userdata.uid) {
        recarr.push(element)
      }
    })
    recarr.push(this.react)
    this.post.reaction = recarr
    this.Post.updatePostId(postid, this.post);
  });
  this.Getallpost();
}

delUser(event) {
  if (event) {
    if (confirm("Are you sure to Delete dataa")) {
      this.Post.deletePost(event);
    }
    console.log("deleted successfully")
    this.ngOnInit()
  }
}
}
