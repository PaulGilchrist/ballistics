import { Firearm } from './firearm.model';
import { Round } from './round.model';
import { Target } from './target.model';
import { Weather } from './weather.model';

export interface Store {
    firearmId: string; // Selected firearm guid
    firearms: Firearm[]; // Contains the rounds
    roundId: string; // Selected round guid
    target: Target;
    weather: Weather;
}
