import styled from 'styled-components/native';

interface DropShadowViewProps {
    elevation?: number;
}

export default {
    DropShadowView: styled.TouchableOpacity<DropShadowViewProps>`
        shadow-color: #000;
        shadow-offset: 0px 4px;
        shadow-opacity: 0.3;
        shadow-radius: 4.65px;
        elevation: ${props => props.elevation || 4};
    `
}