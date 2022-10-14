import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//for file upload as image and video
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { userForm } from 'src/app/modal/form';
import { PostService } from 'src/app/Services/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  userdata = JSON.parse(localStorage.getItem('userDetail'));
  private trigger: Subject<void> = new Subject();
  public webcamImage !: WebcamImage;
  captureImages = [];
  showcamera: boolean = false;
  showeditdata: boolean = false;
  postRef: AngularFirestoreCollection<userForm>;
  getdata: AngularFirestoreCollection;

  // hastagas
  pattern = /(#\w+)/gm;


  editId = '';
  editedData: any = [];
  allusers: any = {};
  // file upload
  selectedFiles?: FileList;
  currentFile?: File;
  imageInfos?: Observable<any>;
  // file upload close

  userForm = new FormGroup({
    name: new FormControl(''),
    profilePic: new FormControl(''),
    postText: new FormControl(''),
    tags: new FormControl(''),
    imageData: new FormGroup([]),
    reaction: new FormGroup([]),
    time: new FormControl(''),
    uid: new FormControl(''),
  });


  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute, private Post: PostService, public router: Router) {
    this.postRef = this.afs.collection<userForm>('posts');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.editId = data.get('id');
      if (data.get('id')) {
        this.showeditdata = false;
        this.editQueryById()
        this.update()
      } else {
        this.showeditdata = true;
      }
    })

    const Draft = JSON.parse(localStorage.getItem('DraftPost'))
    if (Draft) {
      this.userForm.patchValue({
        postText: Draft.postText,
        imageData: Draft.imageData[0]
      });
      this.captureImages = Draft.imageData;
      this.showcamera = false;
    }
  }

  public triggerSnapshot(): void {
    this.showcamera = true;
    this.trigger.next();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImages.push(webcamImage!.imageAsDataUrl)
    this.showcamera = false;
    console.info('received webcam image', this.captureImages);
  }
  public get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  // file upload as photo or video
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log("photos", e.target.result);
          // this.preview = e.target.result;
          this.captureImages.push(e.target.result)
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  onSubmit = () => {
    const obj: any = {
      name: this.userdata.name,
      profilePic: this.userdata.profilepic,
      postText: this.userForm.value.postText,
      tags: this.userForm.value.postText?.match(this.pattern),
      imageData: this.captureImages,
      time: Date.now(),
      uid: this.userdata.uid
    };
    this.postRef.add(obj).then(_ => {
      console.log("Post Addded : ", obj);
      this.router.navigate(['landingpage'])
    }).catch(error => {
      console.log("Post error : ", error);
    });

    localStorage.removeItem('DraftPost');
  }

  // imageSrc: any = [];

  editQueryById() {
    this.Post.getsinglepost(this.editId).then(resultofobj => {
      this.editedData = resultofobj;
      localStorage.setItem('UserObj', JSON.stringify(resultofobj));
      var LocalData = JSON.parse(localStorage.getItem("UserObj"));
      this.userForm.patchValue({
        name: resultofobj.name,
        profilePic: resultofobj.profilepic,
        postText: LocalData.postText,
        imageData: LocalData.imageData[0],
      });
      this.captureImages = LocalData.imageData;
      console.log(this.captureImages, 'User');
    });
  }
  update() {
    const UpdateData = ({
      imageData: this.captureImages,
      name: this.editedData.name,
      profilePic: this.editedData.profilePic,
      postText: this.userForm.value.postText,
    })
    this.Post.updatePostId(this.editId, UpdateData)

    console.log(UpdateData, 'Update Data Logging...');
  }
  deleteimg(captureImages) {
    this.captureImages.splice(captureImages, 1)
    this.update()
  }

  //draft
  Draft() {
    const draftObj: any = {
      name: this.userdata.name,
      profilePic: this.userdata.profilepic,
      postText: this.userForm.value.postText,
      tags: this.userForm.value.postText?.match(this.pattern),
      imageData: this.captureImages,
      time: Date.now()
    };
    if (confirm('Save as Draft')) {
      localStorage.setItem('DraftPost', JSON.stringify(draftObj))
    }
  }
}
