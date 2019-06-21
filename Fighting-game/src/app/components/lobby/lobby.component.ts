import { Router } from '@angular/router';
import { IRoom } from './../../models/room.model';
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
  message = 'Welcome to game lobby';
  roomPlayers: Array<IRoom>;
  isInRoom: boolean = false;
  userId: string;

  constructor(public _lobbyService: LobbyService,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.getRooms();
    this.getOnlinePlayersCount();
    this.getCurrentUserId();
  }

  public toggleRoom(roomNum: number, userId: string) {
    this.joinedRoom = roomNum;
    const roomId = 'Room ' + roomNum;
    const selectedRoom = this.roomPlayers[roomNum - 1];
    delete selectedRoom.playerCount;
    if (!this.isInRoom) {
      if (selectedRoom.player1 === '') {
        selectedRoom.player1 = userId;
        this.router.navigateByUrl('/room/' + roomNum);
      } else {
        selectedRoom.player2 = userId;
        this.router.navigateByUrl('/room/' + roomNum);
      }
      this._lobbyService.updateRoom(roomId, selectedRoom);
      this.isInRoom = true;
      this.message = 'You joined room ' + roomNum;
      this.joinedRoom = roomNum;
    } else {
      selectedRoom.player1 = '';
      this.joinedRoom = 0;
      this.isInRoom = false;
      this.message = 'Welcome to game lobby';
      this._lobbyService.updateRoom(roomId, selectedRoom);
    }
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public getOnlinePlayersCount() {
    this._lobbyService.getPlayers()
      .subscribe(data => {
        this.onlinePlayers = 0;
        for (let user of data) {
          if (user.online === true) {
            this.onlinePlayers += 1;
          }
        }
      });
  }

  public getCurrentUserId() {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }

  public getRooms() {
    this._lobbyService.getRooms().subscribe(rooms => {
      this.roomPlayers = rooms.map(r => {
        r.playerCount = (r.player1 ? 1 : 0) + (r.player2 ? 1 : 0);
        const room = r as IRoom;
        return room;
      });
    });
  }

}
