import { Schema, type } from '@colyseus/schema';
import { Types } from '@tosios/common';

export class Game extends Schema {

  @type('string')
  public mapName: string;

  @type('string')
  public state: Types.GameState;

  @type('number')
  public lobbyEndsAt: number;

  @type('number')
  public gameEndsAt: number;

  @type('number')
  public maxPlayers: number;

  @type('string')
  public mode: Types.GameMode;

  private lobbyDuration: number;
  private gameDuration: number;

  // Init
  constructor(
    mapName: string,
    lobbyDuration: number,
    gameDuration: number,
    maxPlayers: number,
    state: Types.GameState = 'waiting',
    mode: Types.GameMode = 'deathmatch',
  ) {
    super();
    this.mapName = mapName;
    this.lobbyDuration = lobbyDuration;
    this.gameDuration = gameDuration;
    this.maxPlayers = maxPlayers;
    this.mode = mode;
    this.setState(state);
  }


  // Methods
  setState(newState: Types.GameState) {
    // Don't update state if it's already the same
    if (this.state === newState) {
      return;
    }

    switch (newState) {
      case 'waiting': {
        this.lobbyEndsAt = undefined;
        this.gameEndsAt = undefined;
      } break;
      case 'lobby': {
        this.lobbyEndsAt = Date.now() + this.lobbyDuration;
      } break;
      case 'game': {
        this.gameEndsAt = Date.now() + this.gameDuration;
      } break;
    }

    this.state = newState;
  }
}
