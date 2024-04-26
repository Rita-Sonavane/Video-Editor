import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js';

@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.css']
})
export class VideoEditorComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasa: ElementRef<HTMLCanvasElement> | any;
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement> | any;
  @ViewChild('waveform', { static: true }) waveformRef: any;
  @ViewChild('wavetimeline', { static: true }) wavetimelineRef: any;


  //
  scaleValue: number = 100;
  opacityValue: number = 100;
  rotationValues = { x: 0.0, y: 0.0, z: 0.0 };
  positionValues = { x: 0.0, y: 0.0, z: 0.0 };

  data: any = {};

  constructor() {
    this.updateData();

  }

  // Method to update the JSON data
  updateData() {
    this.data = {
      scale: this.scaleValue,
      opacity: this.opacityValue,
      rotation: this.rotationValues,
      position: this.positionValues
    };
    console.log("this.data", this.data);
  }


  //select video
  selectedvideo = "";

  layoutStyle: string = 'horizontal';

  toggleLayout(style: string) {
    this.layoutStyle = style;

    console.log("check style", style);
  }



  isEyeToggled: boolean = false;
  isLockToggled: boolean = false;

  isEyeToggled2: boolean = false;
  isLockToggled2: boolean = false;

  toggleEye() {
    this.isEyeToggled = !this.isEyeToggled;
  }

  toggleEye2() {
    this.isEyeToggled2 = !this.isEyeToggled2;
  }

  toggleLock() {
    this.isLockToggled = !this.isLockToggled;
  }

  toggleLock2() {
    this.isLockToggled2 = !this.isLockToggled2;
  }


  isPlaying: boolean = false;

  togglePlayPause() {

    this.isPlaying = !this.isPlaying;
  }




  // -------------------------------------------------------


  linGrad: CanvasGradient | any;
  timelineDuration: number = 0;
  wavesurfer: WaveSurfer | any;
  videoElement: HTMLVideoElement | any;
  canvas: HTMLCanvasElement | any;
  ctx: CanvasRenderingContext2D | any;
  isPlayingvideo: boolean = false;




  ngOnInit(): void {

    this.linGrad = this.createLinearGradient();
    this.videoElement = document.getElementById("rendering_video");
    this.canvas = document.getElementById('actual_canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log("checkkkkkkkkkkkkkkkkkkkkk");
    console.log(this.videoElement);
    // Initialize WaveSurfer
    this.wavesurfer = WaveSurfer.create({
      container: this.waveformRef.nativeElement,
      // container: '#waveform',
      height: 64,
      minPxPerSec: 75,
      waveColor: ['#3a3a4a', '#ffaaaa'],
      cursorColor: '#3a3a4a',
      backend: 'MediaElement',
      plugins: [
        // TimelinePlugin.create({ timeInterval: 1, primaryLabelInterval: 5 }),
       
        TimelinePlugin.create({
          container: this.wavetimelineRef.nativeElement,
          // secondaryColor: '#3a3a4a',
          // secondaryFontColor: '#3a3a4a',
          height: 25,
          // notchPercentHeight: 2,
        })

        // TimelinePlugin.create({
        //     container: this.wavetimelineRef.nativeElement,
        //     secondaryColor: '#3a3a4a',
        //     secondaryFontColor: '#3a3a4a',
        //     height: 20,
        //     notchPercentHeight: 2,
        // formatTimeCallback : ((seconds)=>{
        //     if(seconds < 60)
        //         return seconds + "s";
        //     else if(seconds > 60 )
        //         return Math.round(seconds/60).toPrecision(2) + "m";
        // }),
        // }),
      ]

    });



    // this.wavesurfer.setMute();
    // this.wavesurfer.fireEvent("ready");

    this.wavesurfer.load(this.selectedvideo);


    this.video.nativeElement.src = this.selectedvideo;

    this.video.nativeElement.addEventListener('canplay', () => {
      const ctx = this.canvasa.nativeElement.getContext('2d');
      this.canvasa.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvasa.nativeElement.height = this.video.nativeElement.videoHeight;


      setInterval(() => {
        ctx.clearRect(0, 0, this.canvasa.nativeElement.width, this.canvasa.nativeElement.height);
        ctx.globalAlpha = this.data.opacity / 100;


        ctx.clearRect(0, 0, this.canvasa.nativeElement.width, this.canvasa.nativeElement.height);
        ctx.globalAlpha = this.data.opacity / 100;
        ctx.drawImage(this.video.nativeElement, this.data.position.x,
          this.data.position.y, this.canvasa.nativeElement.width * (this.data.scale / 100),
          this.canvasa.nativeElement.height * (this.data.scale / 100));
      }, 1000 / 30);



    });

    // timeline.create(
    //   {
    //     container: this.wavetimelineRef.nativeElement,
    //     secondaryColor: '#3a3a4a',
    //     secondaryFontColor: '#3a3a4a',
    //     height: 20,
    //     notchPercentHeight: 2,
    // formatTimeCallback : ((seconds)=>{
    //     if(seconds < 60)
    //         return seconds + "s";
    //     else if(seconds > 60 )
    //         return Math.round(seconds/60).toPrecision(2) + "m";
    // }),
    // });
  }

  createLinearGradient(): CanvasGradient {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const linGrad: any = ctx?.createLinearGradient(0, 0, 4000, 0);
    linGrad.addColorStop(0, '#204bc2');
    linGrad.addColorStop(0.5, '#8621ff');
    linGrad.addColorStop(1, '#204bc2');
    return linGrad;
  }

  // playMedia(): void {

  //   if (this.isPlayingvideo) {
  //     this.videoElement.pause();
  //     this.wavesurfer.pause();
  //     this.isPlayingvideo = false;
  //     this.isPlaying = !this.isPlaying;

  //   } else {
  //     this.videoElement.play();
  //     this.wavesurfer.play();
  //     this.drawFrame();
  //     this.timelineDuration = this.videoElement.duration;
  //     this.isPlayingvideo = true;
  //     this.isPlaying = !this.isPlaying;
  //   }
  // }

  // drawFrame(): void {
  //   if (!this.videoElement.paused && !this.videoElement.ended) {
  //     // this.ctx.drawImage(this.videoElement, 0, 0, 300, 200);
  //     requestAnimationFrame(() => this.drawFrame());
  //   }
  // }

  playMedia(): void {

    if (this.isPlayingvideo) {
      this.videoElement.pause();
      this.wavesurfer.pause();
      this.isPlayingvideo = false;
      this.isPlaying = !this.isPlaying;
      console.log("Paus TAPPED");

    } else {
      this.wavesurfer.load(this.selectedvideo);
      this.videoElement.play();
      this.wavesurfer.play();
      this.drawFrame();
      this.timelineDuration = this.videoElement.duration;
      this.isPlayingvideo = true;
      this.isPlaying = !this.isPlaying;

      // Synchronize wavesurfer with video time
      this.videoElement.addEventListener('timeupdate', () => {
        const currentTime = this.videoElement.currentTime;
        this.wavesurfer.seekTo(currentTime / this.videoElement.duration);

        // console.log("Play TAPPED",this.selectedvideo,currentTime);
      });

    }
  }

  drawFrame(): void {
    if (!this.videoElement.paused && !this.videoElement.ended) {
      // this.ctx.drawImage(this.videoElement, 0, 0, 300, 200);
      requestAnimationFrame(() => this.drawFrame());
    }
  }

  handleVideoClick(videoSrc: string) {
    console.log('Clicked video source:', videoSrc);
    this.selectedvideo = videoSrc;
    this.video.nativeElement.src = this.selectedvideo;
    this.playMedia();
    if (this.isPlayingvideo === false && this.isPlaying == false) {

      this.isPlaying = !this.isPlaying;
      this.isPlayingvideo = true;
    }

    console.log("check flag", this.isPlayingvideo, this.isPlaying)
  }


  // handleVideoClick(videoSrc: string) {
  //   console.log('Clicked video source:', videoSrc);
  //   this.selectedvideo = videoSrc;

  //   this.playMedia();
  //   this.video.nativeElement.src = this.selectedvideo;

  //   if (this.isPlayingvideo === false && this.isPlaying == false) {
  //     this.isPlaying = !this.isPlaying;
  //     this.isPlayingvideo = true;
  //   }

  //   console.log("check flag", this.isPlayingvideo, this.isPlaying)
  // }

  seekTo(time: any) {
    this.video.nativeElement.currentTime += time;
  }

  onSliderInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log("value", value)
    // Adjust the width of the waveform-timeline and waveform elements
    // this.wavetimelineRef.nativeElement.style.width = value + 'px';
    // this.waveformRef.nativeElement.style.width = value + 'px';

    const minPxPerSec = value
    this.wavesurfer.zoom(minPxPerSec)

    // Trigger redraw event (assuming wavesurfer is available)
    // wavesurfer.fireEvent('redraw');
  }






}
function getRotationValues() {
  throw new Error('Function not implemented.');
}

