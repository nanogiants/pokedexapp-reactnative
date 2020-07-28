import React, { useState } from 'react';
import styled from 'styled-components/native';
import PokemonCardItem from './PokemonCardItem';
import PokemonDto from '../dtos/Pokemon.dto';
import PokemonApi from '../api';

const ScrollViewStyle = styled.ScrollView`
    background-color: #ffffff;
`;

interface PokemonListProps {
    componentId: string;
}

const PokemonList = (props: PokemonListProps) => {
    const [pokemonItems, setPokemonItems] = useState(PokemonApi.getAllPokemon());

    return (
        <ScrollViewStyle>
            {
                pokemonItems.map((item: PokemonDto) => (
                    <PokemonCardItem
                        parentComponentId={props.componentId}
                        key={item.id}
                        name={item.name}
                        types={item.types}
                        imageUrl={item.imageUrl}
                        id={item.id}
                        height={item.height}
                        weight={item.weight}
                        baseExperience={item.baseExperience}
                        order={item.order}
                        stats={item.stats}
                        description={item.description}
                        moves={item.moves}
                        evolutionId={item.evolutionId}
                    />
                ))
            }
        </ScrollViewStyle>
    );
}

PokemonList.options = {
    topBar: {
        visible: true,
        title: {
            text: 'PokemonList'
        }
    },
};

export default PokemonList;