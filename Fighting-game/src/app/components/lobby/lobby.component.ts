import { IUser } from './../../models/user/user.model';
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
  currentPlayer: IUser;

  constructor(public _lobbyService: LobbyService,
    public authService: AuthService,
    public router: Router) { this.isInRoom = false; }

  ngOnInit() {
    this.getRooms();
    this.getOnlinePlayersCount();
    this.getCurrentUserId();
  }

  public toggleRoom(roomNum: number, userId: string): void {
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
      this.currentPlayer.room = roomNum;
      this.authService.updatePlayer(userId, this.currentPlayer);
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

  private checkIfJoined(): void {
    this.authService.getPlayer(this.userId).subscribe(player => {
      this.currentPlayer = player;
      if (player.room !== -1) {
        this.router.navigateByUrl('/room/' + player.room);
      }
    });
  }

  public getOnlinePlayersCount(): number {
    this.authService.getPlayers()
      .subscribe(data => {
        this.onlinePlayers = 0;
        for (const user of data) {
          if (user.online === true) {
            this.onlinePlayers += 1;
          }
        }
      });
    return this.onlinePlayers;
  }

  public getCurrentUserId(): string {
    this.userId = this.authService.getUserId();
    this.checkIfJoined();
    return this.userId;
  }

  public getRooms(): Array<IRoom> {
    this._lobbyService.getRooms().subscribe(rooms => {
      this.roomPlayers = rooms.map(r => {
        r.playerCount = (r.player1 ? 1 : 0) + (r.player2 ? 1 : 0);
        const room = r as IRoom;
        return room;
      });
    });
    return this.roomPlayers;
  }

}
