/**
 * Created by bauke on 8-6-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Player} from './player';
import { Pitcher } from './pitcher';

@Injectable()
export class PlayerService {
  constructor (
	private http: Http
  ) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get('/api/players').map((res:Response) => {return res.json();});
  }

  updatePlayer(player:Player): any {
    return this.http.patch('/api/player/' + player.id ,{"player_name" : player.name}).map((res:Response) => {;return res.json();});
  }

  getActivePlayers(): Observable<Player[]> {
    return this.http.get('/api/playersActive').map((res:Response) => {return res.json();})
  }

  addPlayer(player:Player): any {
    return this.http.post('/api/player',{"player_name" : player.name}).subscribe();
  }

  getPitchers(): Observable<Pitcher[]> {
    return this.http.get('/api/pitchers').map((res:Response) => {console.log(res);return res.json();});
  }

  gotPitcher(player:Player): any {
    return this.http.post('/api/log', {player_id: player.id}).subscribe();
  }

  removePlayer(player:Player): any {
    return this.http.delete('/api/removePlayer/' + player.id).subscribe();
  }
}
