import { LobbyService, AuthService } from './../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  joinedRoom: number;
  onlinePlayers: number;
  message: string;
  roomPlayers: number[];
  isInRoom: boolean;


  constructor(public _lobbyService: LobbyService,
              public authService: AuthService) { }

  ngOnInit() {
    this.getRoomMessage();
    this.getRoomPlayers();
    this.getOnlinePlayers();
    this.countOnlinePlayers();
  }

  public countPlayers(roomNum: number): void {
    if (!this._lobbyService.isInRoom) {
      this._lobbyService.joinRoom(roomNum);
      this.getJoinedRoom();
      this.getRoomMessage();
      this.getRoomPlayers();
      this.getPlayerState();
    } else {
      this._lobbyService.leaveRoom();
      this._lobbyService.joinedRoom = 0;
      this.getJoinedRoom();
      this.getRoomMessage();
      this.getRoomPlayers();
      this.getPlayerState();
    }
  }

  public getJoinedRoom() {
    this.joinedRoom = this._lobbyService.joinedRoom;
  }

  public getOnlinePlayers() {
    this.onlinePlayers = this._lobbyService.onlinePlayers;
  }

  public getRoomMessage() {
    this.message = this._lobbyService.roomMessage;
  }

  public getRoomPlayers() {
    this.roomPlayers = this._lobbyService.joinedPlayers;
  }

  public getPlayerState() {
    this.isInRoom = this._lobbyService.playerState;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  private countOnlinePlayers() {
    if (this.authService.isLoggedIn) {
      this.onlinePlayers += 1;
    }
  }

}
