import { IUser } from './../../models/user/user.model';
import { AuthService } from './../../services/auth.service';
import { LobbyService } from './../../services/lobby.service';
import { Component, OnInit } from '@angular/core';
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
  formatedDate: string;
  currentPlayer: IUser;
  lookingForFight = false;
  playersWaiting: Array<string>;
  joinedPlayers = [];
  playersUserNames = [];

  constructor(private _lobbyService: LobbyService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.roomNum = this._activatedRoute.snapshot.params.roomNum; //ROOM number
    this.getCurrentUserId();
    this.getRoomPlayers(this.roomNum);
    setInterval(() => this.checkIfJoined(), 3000);
  }

  private getRoomPlayers(roomNum: number): IRoom {
    const roomId = 'Room ' + roomNum;
    this._lobbyService.getRoom(roomId).subscribe(room => {
      this.room = room;
      this.playersWaiting = room.playersWaiting;
      this.players = room.players;
    });
    return this.room;
  }

  public lookForAFight() {
      this.room.playersWaiting.push(this.currentUserId);
      this.updateRoom(this.roomNum, this.room);
      this.joinRandomPlayers();
      this.lookingForFight = true;
  }

  public stopLookingForAFight() {
      const currentUserPosition = this.room.playersWaiting.indexOf(this.currentUserId);
      this.room.playersWaiting.splice(currentUserPosition, 1);
      this.updateRoom(this.roomNum, this.room);
      this.lookingForFight = false;
  }

  private getRoomPlayersUserNames(): Array<string> { // when we have player username
    for (const player of this.players) {
      this._authService.getPlayer(player).subscribe(user => {
        this.playersUserNames.push(user.displayName);
      });
      return this.playersUserNames;
    }
  }

  public sendMessage(message: string): void {
    const sentMessage = message;
    this.getCurrentDate();
    const playerSentMessage = this.formatedDate + ' ' + this.currentUserId + ': ' + sentMessage;
    this.room.chat.push(playerSentMessage);
    this.updateRoom(this.roomNum, this.room);
  }

  private joinRandomPlayers() {
    if (this.playersWaiting.length > 1) {
      this.joinedPlayers = this.playersWaiting.sort(() => .5 - Math.random()).slice(0, 2);
      this.room.matchedPlayers = this.joinedPlayers;
      this.updateRoom(this.roomNum, this.room);
      this.checkIfJoined();
    }
  }

  private checkIfJoined() {
    if (this.room.matchedPlayers.indexOf(this.currentUserId) > -1) {
      this.stopLookingForAFight();
      this.leaveRoom();
      this._router.navigateByUrl('/arena');
      this.joinedPlayers = [];
    }
  }

  private getCurrentUserId(): string {
    this.currentUserId = this._authService.getUserId();
    this.getCurrentPlayer(this.currentUserId);
    return this.currentUserId;
  }

  private updateRoom(roomNum: number, data: IRoom): void {
    const roomId = 'Room ' + roomNum;
    this._lobbyService.updateRoom(roomId, data);
  }

  public leaveRoom(): void {
    let roomId = 'Room ' + this.roomNum;
    const currentUserPosition = this.room.players.indexOf(this.currentUserId);
    this.room.players.splice(currentUserPosition, 1);
    this.room.playerCount -= 1;

    if (this.room.players.length === 0) {
      this.room.chat = [];
    }
    this.currentPlayer.room = -1;
    this._authService.updatePlayer(this.currentUserId, this.currentPlayer);
    this._lobbyService.updateRoom(roomId, this.room);
    this._router.navigateByUrl('/lobby');
  }

  private getCurrentDate(): string {
    this.formatedDate = '';
    const fullDate = new Date();
    const hours = fullDate.getHours();
    let hoursString = '';
    if (hours < 10) {
        hoursString = `0${hours.toString()}`;
    } else {
        hoursString = hours.toString();
    }
    const minutes = fullDate.getMinutes();
    let minutesString = '';
    if (minutes < 10) {
        minutesString = `0${minutes.toString()}`;
    } else {
        minutesString = minutes.toString();
    }
    this.formatedDate = hoursString + ':' + minutesString;
    return this.formatedDate;
  }

    private getCurrentPlayer(playerId: string): IUser {
    this._authService.getPlayer(playerId).subscribe(player => {
      this.currentPlayer = player;
    });
    return this.currentPlayer;
  }


}
