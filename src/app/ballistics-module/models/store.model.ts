import { Firearm } from './firearm.model';
import { Target } from './target.model';
import { Weather } from './weather.model';

export interface Store {
    firearms: Firearm[]; // Contains the rounds
    target: Target;
    weather: Weather;
}
