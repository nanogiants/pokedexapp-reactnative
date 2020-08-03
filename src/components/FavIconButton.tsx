import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import UnfavedIcon from '../images/svgs/grade-24px.svg';
import FavedIcon from '../images/svgs/grade-24px_filled.svg';

import PokemonDto from 'src/dtos/Pokemon.dto';
import AsyncStorage from '@react-native-community/async-storage';

const IconStyle = styled.TouchableOpacity`
    padding-right: 16px;
`;

interface FavIconButtonProps extends PokemonDto {
}

const FavIconButton = (props: FavIconButtonProps) => {
    const [faved, setFaved] = useState(false);

    useEffect(() => {
        const fetchFavedPokemon = async () => {
            const value = await AsyncStorage.getItem('favedPokemon');
            const list: number[] = value ? JSON.parse(value) : [];

            setFaved(!!list.find(item => item === props.id));
        }

        fetchFavedPokemon();
    }, []);

    const faveOrUnfavePokemon = async () => {
        const value = await AsyncStorage.getItem('favedPokemon');
        let list: number[] = value ? JSON.parse(value) : [];

        if (faved) {
            list = list.filter(item => item !== props.id); // remove from fav list
        } else {
            list = list.concat(props.id);
        }

        await AsyncStorage.setItem('favedPokemon', JSON.stringify(list));
        setFaved(!faved);
    };

    return (
        <IconStyle onPress={faveOrUnfavePokemon}>
            {
                faved ? <FavedIcon /> : <UnfavedIcon />
            }
        </IconStyle>
    )
}

export default FavIconButton;