import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  onlinePlayers = 0;
  isOnline: boolean;
  roomPlayers = [0, 0, 0, 0];
  private message = 'Welcome to game lobby';
  isInRoom = false;
  joinedRoomNum: number;

  constructor(private _router: Router) { }

  public joinRoom(roomNum: number): number {
    this.joinedRoomNum = roomNum;
    for (let i = 0; i < this.roomPlayers.length; i++) {
      this.roomPlayers[roomNum - 1] += 1;
      this.message = 'You joined room ' + roomNum;
      this.isInRoom = true;
      if (this.roomPlayers[roomNum - 1] === 2) {
        this.roomPlayers[i] = 0;
        this._router.navigateByUrl('/fight');
      }
      return this.roomPlayers[roomNum - 1];
    }
  }

  public leaveRoom(): number {
    for (let i = 0; i < this.roomPlayers.length; i++) {
      if (this.roomPlayers[this.joinedRoomNum - 1] === 0) {
        return;
      } else {
        this.roomPlayers[this.joinedRoomNum - 1] -= 1;
      }
      this.message = 'Welcome to game lobby';
      this.isInRoom = false;

      return this.roomPlayers[this.joinedRoomNum - 1];
    }
  }

  public get joinedRoom(): number {
    return this.joinedRoomNum;
  }

  public set joinedRoom(num: number) {
    this.joinedRoomNum = num;
  }

  public get onlinePlayersNum(): number {
    return this.onlinePlayers;
  }

  public set onlinePlayersNum(num: number) {
    this.onlinePlayers = num;
  }

  public get roomMessage(): string {
    return this.message;
  }

  public get joinedPlayers(): Array<number> {
    return this.roomPlayers;
  }

  public get playerState(): boolean {
    return this.isInRoom;
  }


}
