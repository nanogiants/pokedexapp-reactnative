import React from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components/native';
import Typography from '../styles/Typography';
import BaseComponents from '../styles/Components';

import PokemonDto from '../dtos/Pokemon.dto';
import PokemonApi from '../api';
import { Navigation } from 'react-native-navigation';

interface BGColorContainerProps {
    backgroundColor: string;
}

interface RowProps {
    width: number;
    bold?: boolean;
    color?: string;
}

const ContainerStyle = styled.ScrollView<BGColorContainerProps>`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${props => props.backgroundColor || '#000000'};
`;

const BackgroundContainerStyle = styled.View`
    height: 100px;
`;

const ContentContainerStyle = styled.View`
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
`;

const CaptionTextStyle = styled(Typography.CaptionTextStyle)`
    margin-bottom: 16px;
    margin-top: 16px;
`;

const HighlightTextStyle = styled(Typography.HighlighTextStyle)`
    align-self: center;
    margin-bottom: 16px;
`;

const DescriptionTextStyle = styled(Typography.HintTextStyle)`
    margin-bottom: 16px;
`

const MainImageStyle = styled.Image`
    width: 200px;
    height: 200px;
    margin-top: -100px;
    align-self: center;
`;

const TypeContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TypeChipStyle = styled.Text<BGColorContainerProps>`
    color: #ffffff;
    border-radius: 4px;
    padding: 4px 32px;
    margin-left: 8px;
    background-color: ${props => props.backgroundColor || '#000000'};
`

const EvolutionContainerStyle = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 2px;
`;

const EvolutionCardStyle = styled(BaseComponents.DropShadowView)`
    border-radius: 8px;
    margin: 6px;
    padding: 8px;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MoveContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 2px;
`;

const RowStyle = styled.Text<RowProps>`
    width: ${props => props.width}px;
    color: ${props => props.color || '#000000'};
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

const SpacerStyle = styled.View`
    margin-bottom: 16px;
`;

interface PokemonDetailProps extends PokemonDto {
    componentId: string;
}

const PokemonDetail = (props: PokemonDetailProps) => {
    const capitalize = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}`;
    const formatId = (id: number) => ('000000000' + id).substr(-3);
    const formatPercent = (value: number) => `${value}%`;
    const navigateToPokemonDetail = (pokemon: PokemonDto) => Navigation.push(props.componentId, {
        component: {
            name: 'pokemondetail',
            passProps: pokemon,
            options: {
                topBar: {
                    title: {
                        text: capitalize(pokemon.name)
                    }
                }
            }
        }
    });

    return (
        <ContainerStyle backgroundColor={PokemonApi.getColorbyTypeName(props.types[0])}>
            <BackgroundContainerStyle />
            <ContentContainerStyle>
                <MainImageStyle source={{ uri: props.imageUrl }}></MainImageStyle>
                <HighlightTextStyle>- {formatId(props.id)} -</HighlightTextStyle>
                <TypeContainer>
                    <CaptionTextStyle>Type:</CaptionTextStyle>
                    {
                        props.types.map((type) => (
                            <TypeChipStyle key={type} backgroundColor={PokemonApi.getColorbyTypeName(type)}>{capitalize(type)}</TypeChipStyle>
                        ))
                    }
                </TypeContainer>
                <DescriptionTextStyle>{props.description}</DescriptionTextStyle>

                <CaptionTextStyle>Evolution Chart</CaptionTextStyle>
                <EvolutionContainerStyle>
                    {
                        PokemonApi.getEvolutionChain(props.id).map(pokemon => (
                            <EvolutionCardStyle
                                onPress={() => {
                                    if (pokemon.id !== props.id) {
                                        navigateToPokemonDetail(pokemon)
                                    }
                                }}
                                key={`${props.id}_${pokemon.id}`}
                            >
                                <Image source={{ uri: pokemon.imageUrl }} style={{ width: 100, height: 100 }} />
                                <Text>{capitalize(pokemon.name)}</Text>
                            </EvolutionCardStyle>
                        ))
                    }
                </EvolutionContainerStyle>

                <CaptionTextStyle>Abilities</CaptionTextStyle>
                <MoveContainer>
                    <RowStyle width={35}>Lvl</RowStyle>
                    <RowStyle width={75}>Type</RowStyle>
                    <RowStyle width={35}>Atk</RowStyle>
                    <RowStyle width={45}>Acc</RowStyle>
                    <Text>Name</Text>
                </MoveContainer>
                {
                    props.moves.map((move) => (
                        <MoveContainer key={move.id}>
                            <RowStyle width={35}>{move.learnedAtLevel}</RowStyle>
                            <RowStyle width={75} color={PokemonApi.getColorbyTypeName(move.type)} bold>{capitalize(move.type)}</RowStyle>
                            <RowStyle width={35}>{move.power}</RowStyle>
                            <RowStyle width={45}>{formatPercent(move.accuracy)}</RowStyle>
                            <Text>{capitalize(move.name)}</Text>
                        </MoveContainer>
                    ))
                }
                <SpacerStyle />
            </ContentContainerStyle>
        </ContainerStyle>
    );
}

export default PokemonDetail;