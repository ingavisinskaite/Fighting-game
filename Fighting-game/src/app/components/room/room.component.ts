import { LobbyService } from './../../services/lobby.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  players: Array<string>;
  allRoomsPlayers: Array<string[]>;

  constructor(private _lobbyService: LobbyService) { }

  ngOnInit() {
    this.getRoomPlayers();
  }

  public getRoomPlayers() {
    this._lobbyService.getRooms().subscribe(rooms => {
      this.allRoomsPlayers = [];
      for (let room of rooms) {
        this.players = [];
        this.players.push(room.player1);
        this.players.push(room.player2);
        this.allRoomsPlayers.push(this.players);
      }
      console.log(this.allRoomsPlayers);
    });
  }

  public getPlayer(playerid: string) {
    this._lobbyService.getPlayer(playerid).subscribe(x => console.log(x));
  }

}
