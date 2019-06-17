import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  onlinePlayers = 0;
  isOnline: boolean;
  firstRoomplayers = 0;
  secondRoomplayers = 0;
  thirdRoomplayers = 0;
  fourthRoomplayers = 0;
  joinedRoom = 'Welcome to game lobby';
  isInRoom = false;
  joinedRoomNum: number;

  constructor(private _router: Router) { }

  public joinRoom(roomNum: number): number {
    this.joinedRoomNum = roomNum;
    if (roomNum === 1) {
      this.firstRoomplayers += 1;
      this.joinedRoom = 'You joined room 1';
      this.isInRoom = true;
      if (this.firstRoomplayers === 2) {
        this.firstRoomplayers = 0;
        this._router.navigateByUrl('/');
      }
      return this.firstRoomplayers;
    } else if (roomNum === 2) {
      this.secondRoomplayers += 1;
      this.joinedRoom = 'You joined room 2';
      this.isInRoom = true;
      if (this.secondRoomplayers === 2) {
        this.secondRoomplayers = 0;
        this._router.navigateByUrl('/');
      }
      return this.secondRoomplayers;
    } else if (roomNum === 3) {
      this.thirdRoomplayers += 1;
      this.joinedRoom = 'You joined room 3';
      this.isInRoom = true;
      if (this.thirdRoomplayers === 2) {
        this.thirdRoomplayers = 0;
        this._router.navigateByUrl('/');
      }
      return this.thirdRoomplayers;
    } else {
      this.fourthRoomplayers += 1;
      this.joinedRoom = 'You joined room 4';
      this.isInRoom = true;
      if (this.fourthRoomplayers === 2) {
        this.fourthRoomplayers = 0;
        this._router.navigateByUrl('/');
      }
      return this.fourthRoomplayers;
    }
  }

  public leaveRoom(): number {
    if (this.joinedRoomNum === 1) {
      if (this.firstRoomplayers === 0) {
        return;
      } else {
        this.firstRoomplayers -= 1;
      }
      this.joinedRoom = 'Welcome to game lobby';
      this.isInRoom = false;

      return this.firstRoomplayers;
    } else if (this.joinedRoomNum === 2) {
      if (this.secondRoomplayers === 0) {
        return;
      } else {
        this.secondRoomplayers -= 1;
      }
      this.joinedRoom = 'Welcome to game lobby';
      this.isInRoom = false;
      return this.secondRoomplayers;
    } else if (this.joinedRoomNum === 3) {
      if (this.thirdRoomplayers === 0) {
        return;
      } else {
        this.thirdRoomplayers -= 1;
      }
      this.joinedRoom = 'Welcome to game lobby';
      this.isInRoom = false;
      return this.thirdRoomplayers;
    } else {
      if (this.fourthRoomplayers === 0) {
        return;
      } else {
        this.fourthRoomplayers -= 1;
      }
      this.joinedRoom = 'Welcome to game lobby';
      this.isInRoom = false;
      return this.fourthRoomplayers;
    }
  }

}
