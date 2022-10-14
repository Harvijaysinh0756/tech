import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  allPost = [];
  userdetails: any;
  // userdata = 
  // file upload
  selectedFiles?: FileList;
  currentFile?: File;
  imageInfos?: Observable<any>;
  preview: any;
  // file upload close

  constructor(private Post: PostService,
    private route: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    //   this.Post.getAllPost().then(res => {
    //     this.allPost = res;

    // });

    this.onAuth();

  }
  ngAfterOnInit() {
    this.update();
  }

  onAuth() {

    this.userdetails = JSON.parse(localStorage.getItem("userDetail"))
    // console.log("test", this.userdetails)
    // this.ngOnInit();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log("photos", e.target.result);
          this.preview = e.target.result;
          // localStorage.setItem('userdetails',JSON.stringify(this.preview))
          // this.c.push(e.target.result)

          const updatelocastorage = ({
            uid: this.userdetails.uid,
            name: this.userdetails.name,
            email: this.userdetails.email,
            profilepic: this.preview
          })

          // console.log("profile pic", updatelocastorage)
          localStorage.setItem('userDetail', JSON.stringify(updatelocastorage))
          this.Post.updateUserid(this.userdetails.uid, updatelocastorage)

          // console.log(updatelocastorage, 'Update profilepic  Logging...');

          let LocalData = JSON.parse(localStorage.getItem("userDetail"));
          // console.log("Profile Get", LocalData)
          this.onAuth();
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  // localStorage.setItem('UserObj', JSON.stringify(resultofobj));
  // let LocalData = JSON.parse(localStorage.getItem("UserObj"));



  update() {
    //  localStorage.setItem('userdetails',JSON.stringify(this.preview))

    console.log("profile pic", this.userdetails.profilepic)
    // this.userdetails.profilepic = this.preview

    const updatelocastorage = ({
      uid: this.userdetails.uid,
      name: this.userdetails.name,
      email: this.userdetails.email,
      profilepic: this.preview
    })


    this.Post.getAllPost().then(res => {
      this.allPost = res;
      this.allPost.forEach((Element) => {
        let Profileobj = Element
        // console.log("asdfghjkl",obj.profilePic)
        if (Element.uid === this.userdetails.uid) {
          // console.log("asdfghjkl",Profileobj.profilePic)
          // console.log("fdghjklhgfg",this.userdetails.profilepic)
          Profileobj.profilePic = this.userdetails.profilepic
          //  console.log(Profileobj.profilePic)
           console.log("zdfsdaf",Element.id)
           this.Post.updatePostId(Element.id,Profileobj)
        }
      })
    })

    // console.log("profile pic", updatelocastorage)
    console.log("profile pic updated ")



    // localStorage.setItem('userDetail', JSON.stringify(updatelocastorage))
    // this.Post.updateUserid(this.userdetails.uid, updatelocastorage)
    // console.log(updatelocastorage, 'Update profilepic  Logging...');
    // let LocalData = JSON.parse(localStorage.getItem("userDetail"));
    // console.log("Profile Get", LocalData)







    
    this.onAuth();
  }


  logout() {
    this.authService.SignOut()
    localStorage.clear()
  }

}
