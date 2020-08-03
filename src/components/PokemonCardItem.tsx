import React from 'react';
import styled from 'styled-components/native';
import Typography from '../styles/Typography';
import { Navigation } from "react-native-navigation";
import AsyncStorage from '@react-native-community/async-storage';

import BaseComponents from '../styles/Components';
import PokemonDto from '../dtos/Pokemon.dto';

const ContainerStyle = styled(BaseComponents.DropShadowView)`
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 8px;
`;

const TextContainerStyle = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const ImageStyle = styled.Image`
    width: 60px;
    height: 60px;
`

interface PokemonCardItemProps extends PokemonDto {
    parentComponentId: string;
}

const PokemonCardItem = (props: PokemonCardItemProps) => {
    const capitalize = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}`;
    const navigateToPokemonDetail = async () => {
        const value = await AsyncStorage.getItem('latestPokemon');
        const result = value ? JSON.parse(value) : null;

        console.log("resul", result);

        await AsyncStorage.setItem('latestPokemon', JSON.stringify(props));

        Navigation.push(props.parentComponentId, {
            component: {
                name: 'pokemondetail',
                passProps: props,
                options: {
                    topBar: {
                        title: {
                            text: capitalize(props.name)
                        },
                        rightButtons: [{
                            id: 'fave',
                            component: {
                                name: 'faviconbutton',
                                passProps: props
                            }
                        }]
                    }
                }
            }
        })
    };

    return (
        <ContainerStyle onPress={navigateToPokemonDetail}>
            <TextContainerStyle>
                <Typography.CaptionTextStyle>{capitalize(props.name)}</Typography.CaptionTextStyle>
                <Typography.SubCaptionTextStyle>{props.types.map(type => capitalize(type)).join(" ")}</Typography.SubCaptionTextStyle>
            </TextContainerStyle>
            <ImageStyle source={{ uri: props.imageUrl }} />
        </ContainerStyle>
    );
}

export default PokemonCardItem;