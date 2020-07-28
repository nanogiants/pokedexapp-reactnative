import { PokemonStatDto } from "./PokemonStat.dto";
import PokemonMoveDto from "./PokemonMove.dto";

export default interface PokemonDto {
    id: number;
    name: string;
    height: number;
    weight: number;
    baseExperience: number;
    order: number;
    types: string[];
    stats: PokemonStatDto[];
    description: string;
    imageUrl: string;
    moves: PokemonMoveDto[];
    evolutionId: number;
}