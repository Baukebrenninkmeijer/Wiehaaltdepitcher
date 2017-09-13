import {Component, OnInit} from '@angular/core';
import {Player} from './player';
import { PlayerService } from './player.service';
import { Pitcher } from './pitcher'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PlayerService]
})
export class AppComponent implements OnInit {
  name = 'wiehaaltdepitcher';
  title = 'Wie haalt de pitcher?';
  players: Player[];
  activePlayers: Player[]
  pitchers: Pitcher[];
  selectedPlayer: Player;
  pitcherBoy: Player;
  editMode: boolean;

  constructor(private playerService: PlayerService){
    this.editMode = false;
  }

  ngOnChange(): void {
    try {
      this.players.sort(function(a: Player ,b: Player): number { return (a.nr_of_pitchers > b.nr_of_pitchers) ? -1 : ((b.nr_of_pitchers > a.nr_of_pitchers) ? 1 : 0); });
      this.getPitchers();
    } catch (e) {
      console.log(e)
    }
  }
  ngOnInit(): void {
    if(!this.selectedPlayer) {
      this.selectedPlayer = new Player();
    }
    this.getPlayers();
    this.getPitchers();
  }

  roll() {
    let tkb = Math.floor(Math.random() * 100)
    // if(tkb === 42) {
    //   this.pitcherBoy =
    // }
    let activePlayers = this.players.filter(function (p) {return p.selected;});
    let rand = Math.floor(Math.random() * activePlayers.length);
    this.pitcherBoy = activePlayers[rand];
  }

  onSelect(player: Player): void {
    console.log(this.selectedPlayer);
    if(this.selectedPlayer && this.selectedPlayer.id == player.id) {
      this.selectedPlayer = new Player();
    } else {
      this.selectedPlayer = player;
    }
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => this.players = players);
  }

  getPitchers(): void {
    this.playerService.getPitchers().subscribe(pitchers => this.pitchers = pitchers);
  }

  cowardFarmer(player: Player): void{
    player.nr_of_laf += 1;
    this.pitcherBoy = null;
    this.ngOnChange();
  }

  fetchedPitcher(player: Player): void {
    player.nr_of_pitchers += 1;
    this.playerService.gotPitcher(this.pitcherBoy);
    this.pitcherBoy = null;
    this.ngOnChange();
  }

  toggleEdit(): void {
    if (this.editMode === false) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
    this.ngOnChange();
  }

  playerAdd() {
    this.playerService.addPlayer(this.selectedPlayer);
    this.getPlayers();
    this.selectedPlayer = null;
  }

  playerSave() {
    this.playerService.updatePlayer(this.selectedPlayer);
    this.getPlayers();
  }

  playerRemove(){
    this.playerService.removePlayer(this.selectedPlayer);
    this.getPlayers();
  }

}
