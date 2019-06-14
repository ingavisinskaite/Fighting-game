import { LobbyService } from './../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {


  constructor(public _lobbyService: LobbyService) { }

  ngOnInit() {
  }

  public countPlayers(roomNum: number): void {
    if (!this._lobbyService.isInRoom) {
      this._lobbyService.joinRoom(roomNum);
    } else {
      this._lobbyService.leaveRoom();
      this._lobbyService.joinedRoomNum = 0;
    }
  }

}
