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
    this.getOnlinePlayersCount();
    this.getCurrentUserId();
    this._lobbyService.getRooms().subscribe(rooms => {
      this.roomPlayers = rooms.map(r => {
        r.playerCount = (r.player1 ? 1 : 0) + (r.player2 ? 1 : 0);
        if (r.playerCount === 2) {
          if (r.player1 === this.userId) {
            this.router.navigateByUrl('/arena');
          } else if (r.player2 === this.userId) {
            this.router.navigateByUrl('/arena');
          } else {
            return;
          }
          r.player1 = '';
          r.player2 = '';
          const updatedRoom = r as IRoom;
          this._lobbyService.updateRoomPlayers(r.id, updatedRoom);
        }
        const room = r as IRoom;
        return room;
      });
    });
  }

  public toggleRoom(roomNum: number, userId: string) {
    const roomId = 'Room ' + roomNum;
    const selectedRoom = this.roomPlayers[roomNum - 1];
    delete selectedRoom.playerCount;
    if (!this.isInRoom) {
      if (selectedRoom.player1 === '') {
        selectedRoom.player1 = userId;
      } else {
        selectedRoom.player2 = userId;
      }
      this._lobbyService.updateRoomPlayers(roomId, selectedRoom).then(x => console.log(x));
      this.isInRoom = true;
      this.message = 'You joined room ' + roomNum;
      this.joinedRoom = roomNum;
    } else {
      selectedRoom.player1 = '';
      this.joinedRoom = 0;
      this.isInRoom = false;
      this.message = 'Welcome to game lobby';
      this._lobbyService.updateRoomPlayers(roomId, selectedRoom).then(x => console.log(x));
    }
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public getOnlinePlayersCount() {
    this._lobbyService.getOnlinePlayers()
    .subscribe(data => {
      this.onlinePlayers = 0;
      for (let user of data) {
        if (user.online === true) {
          this.onlinePlayers += 1;
        }
      }
  });
  }

  public updateRoomPlayers(roomNum: number) {
    const roomId = 'Room ' + roomNum;
    this._lobbyService.updateRoomPlayers(roomId, this.roomPlayers[roomNum]);
  }

  public getCurrentUserId() {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }


}
