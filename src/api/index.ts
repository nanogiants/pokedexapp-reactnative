import PokemonDto from "../dtos/Pokemon.dto";
import Pokemon from '../data/pokemon';
import Moves from '../data/moves';
import PokemonMoves from '../data/pokemon_moves';
import PokemonEvolutions from '../data/pokemon_evolution';
import { uniqBy } from 'lodash';

export default class PokemonApi {
    constructor() { }

    static getAllPokemon(): PokemonDto[] {
        return Pokemon.map((item: any) => ({
            id: item.id,
            name: item.name,
            height: item.height,
            weight: item.weight,
            baseExperience: item.base_experience,
            order: item.order,
            types: item.types.map((type: any) => type.type.name),
            stats: item.stats.map((stat: any) => ({
                stat: parseInt(stat.base_stat),
                name: stat.stat.name
            })),
            description: item.description,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
            evolutionId: item.evolution,
            moves: uniqBy(PokemonMoves.filter(pokemonMove => pokemonMove.pokemonId === item.id && pokemonMove.learnedAt > 0)
                .map((pokemonMove) => {
                    const move = Moves.find(move => parseInt(move.id, 10) === pokemonMove.moveId)!;

                    return {
                        id: parseInt(move?.id),
                        learnedAtLevel: pokemonMove.learnedAt,
                        name: move?.name,
                        power: move?.power,
                        accuracy: move?.accuracy,
                        type: move?.type?.name
                    }
                }), 'id')
        }))
    }

    static getEvolutionChain(id: number): PokemonDto[] {
        const pokemonList = PokemonApi.getAllPokemon();
        const pokemon = pokemonList.find(item => item.id === id)!;

        const evolution = PokemonEvolutions.find(item => item.id === pokemon.evolutionId)!;

        console.log("fhdjkfhdjk", evolution);

        return Object.keys(evolution.chain)
            .map((propertyName: string) => {
                const entry = evolution.chain[propertyName];
                return pokemonList.find(item => item.id === entry.id)!;
            });
    }

    static getColorbyTypeName(typeName: string): string {
        const color = [
            {
                "type": "normal",
                "color": "A8A77A"
            },
            {
                "type": "fire",
                "color": "EE8130"
            },
            {
                "type": "water",
                "color": "6390F0"
            },
            {
                "type": "electric",
                "color": "F7D02C"
            },
            {
                "type": "grass",
                "color": "7AC74C"
            },
            {
                "type": "ice",
                "color": "96D9D6"
            },
            {
                "type": "fighting",
                "color": "C22E28"
            },
            {
                "type": "poison",
                "color": "A33EA1"
            },
            {
                "type": "ground",
                "color": "E2BF65"
            },
            {
                "type": "flying",
                "color": "A98FF3"
            },
            {
                "type": "psychic",
                "color": "F95587"
            },
            {
                "type": "bug",
                "color": "A6B91A"
            },
            {
                "type": "rock",
                "color": "B6A136"
            },
            {
                "type": "ghost",
                "color": "735797"
            },
            {
                "type": "dragon",
                "color": "6F35FC"
            },
            {
                "type": "dark",
                "color": "705746"
            },
            {
                "type": "steel",
                "color": "B7B7CE"
            },
            {
                "type": "fairy",
                "color": "D685AD"
            }
        ].find(colorConfig => colorConfig.type === typeName)!.color;

        return `#${color}`;
    }
}