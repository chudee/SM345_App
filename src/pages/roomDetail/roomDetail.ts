import { Component } from '@angular/core';
import { App, NavController, ViewController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RoomPage } from '.././room/room';
import { ManagerPage } from '.././manager/manager';

import { AdminService } from '../../services/admin.service';
import { MentoroomService } from '../../services/mentoroom.service';

import { Mentoroom } from '../../models/mentoroom';

@Component({
  templateUrl: 'roomDetail.html'
})
export class RoomDetailPage {
  public selectedRoom: Mentoroom;
  private USERID: number;
  private USERAUTH: number;
  private currentUser;
  private room: number;
  sort: boolean = false;

  constructor(
    public app: App, 
    public toastCtrl: ToastController, 
    private adminService: AdminService, 
    private mentoroomService: MentoroomService,
    public navParams: NavParams, 
    public appCtrl: App, 
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this.selectedRoom = this.navParams.get("selectedRoom");
    this.room = this.navParams.get("room");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.USERID = this.currentUser.USERID;
    this.USERAUTH = this.currentUser.USERAUTH;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openRoomPage() {
    this.appCtrl.getRootNav().setRoot(RoomPage);
    this.viewCtrl.dismiss();
  }

  //관리자 - 멘토방 개설 승낙
  confirm() {
    this.adminService.confirmMentoroom(this.selectedRoom);
    this.Toast('개설이 완료되었습니다');
    if(this.room == 0){
    setTimeout(() => { 
      this.app.getRootNav().setRoot(RoomPage);
      }, 300);
      this.dismiss();
    }
    if(this.room == 1){
      setTimeout(() => { 
        this.app.getRootNav().setRoot(ManagerPage);
        }, 300);
        this.dismiss();
    }
  }

  //관리자 - 멘토방 개설 반려
  reject(){
    this.adminService.rejectMentoroom(this.selectedRoom.mentoroom_id);
    this.Toast('개설이 반려되었습니다');
    if(this.room == 0){
      setTimeout(() => { 
        this.app.getRootNav().setRoot(RoomPage);
        }, 300);
        this.dismiss();
      }
      if(this.room == 1){
        setTimeout(() => { 
          this.app.getRootNav().setRoot(ManagerPage);
          }, 300);
          this.dismiss();
      }
  }

  //멘티 신청
  joinMentee() {
    this.mentoroomService.joinMentee(this.selectedRoom.mentoroom_id, this.USERID);
    this.Toast('멘티신청이 완료되었습니다.');

      // .then(response => this.Toast(response))
      // .catch(() => this.Toast('실패'))
  }

  //관리자 - 멘토방 개설 승낙
  confirm1() {
    this.adminService.confirmMentoroom(this.selectedRoom);
    this.Toast('개설이 완료되었습니다');
    if(this.room == 0){
    setTimeout(() => { 
      this.app.getRootNav().setRoot(RoomPage);
      }, 300);
      this.dismiss();
    }
    if(this.room == 1){
      setTimeout(() => { 
        this.app.getRootNav().setRoot(ManagerPage);
        }, 300);
        this.dismiss();
    }
  }

  Toast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  //팀원확인
  mentiListCheck() {
    let alert = this.alertCtrl.create({
      title: 'Basic Alert',
      subTitle: '기본 알림창입니다.',
      buttons: ['OK']
    });
    alert.present();
  }

  //보고서 제출 파일첨부 창 띄우기
  openReport() {
    this.sort = true;
  }

  //보고서 파일 제출하기
  reportSave() {
    this.Toast('보고서 제출이 완료되었습니다.');
    setTimeout(() => { 
      this.dismiss();
    }, 500);
  }

}
