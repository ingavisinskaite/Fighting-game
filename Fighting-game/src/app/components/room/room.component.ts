import { AuthService } from './../../services/auth.service';
import { LobbyService } from './../../services/lobby.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoom } from 'src/app/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  players = [];
  currentUserId: string;
  roomNum: number;
  room: IRoom;

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event) {
  //   this.removePlayerFromRoom();
  // }

  constructor(private _lobbyService: LobbyService,
              private _authService: AuthService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router ) { }

  ngOnInit() {
    this.roomNum = this._activatedRoute.snapshot.params.roomNum;
    this.getCurrentUserId();
    this.getRoomPlayers(this.roomNum);
  }

  public getRoomPlayers(roomNum: number) {
    const roomId = 'Room ' + roomNum;
    this._lobbyService.getRoom(roomId).subscribe(room => {
      this.room = room;
    });
  }

  public sendMessage(message: string) {
    const sentMessage = message;
    const playerSentMessage = this.currentUserId + ': ' + sentMessage;
    this.room.chat.push(playerSentMessage);
    this.updateRoom(this.roomNum, this.room);
  }

  public getCurrentUserId() {
    this.currentUserId = this._authService.getUserId();
    console.log(this.currentUserId);
  }

  public updateRoom(roomNum: number, data: IRoom) {
    let roomId = 'Room ' + roomNum;
    this._lobbyService.updateRoom(roomId, data);
  }

  public leaveRoom() {
    let roomId = 'Room ' + this.roomNum;
    if (this.room.player1 === this.currentUserId) {
      this.room.player1 = '';
    } else {
      this.room.player2 = '';
    }

    if (this.room.player1 === '' && this.room.player2 === '') {
      this.room.chat = [];
    }
 
    this._lobbyService.updateRoom(roomId, this.room);
    this._router.navigateByUrl('/lobby');
  }

}
