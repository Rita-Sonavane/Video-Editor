import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  uploadedVideo: File | null = null;
  // videoData: any = null;
  videos: any[] = [];

  constructor(private router: Router) { }

  navigateToAbout() {
    this.router.navigateByUrl('/video-editor');
  }


  handleFileInput(event: any): void {
    const uploadedVideo = event.target.files[0];
    const videoData = {
      name: uploadedVideo.name,
      size: uploadedVideo.size,
      type: uploadedVideo.type,
      source: `assets/video/${uploadedVideo.name}`
    };
    this.videos.push(videoData);
  
  
  
    // this.addVideoToJSON();
  }


  // addVideoToJSON(): void {
  //   if (this.uploadedVideo) {
  //      this.videoData = {
  //       name: this.uploadedVideo.name,
  //       size: this.uploadedVideo.size,
  //       type: this.uploadedVideo.type,
  //       source:`assets/video/${this.uploadedVideo.name}`
  //     };


  //     const jsonData = JSON.stringify(this.videoData);
  //     console.log("check.. json",jsonData); 
    // }
  // }


}
