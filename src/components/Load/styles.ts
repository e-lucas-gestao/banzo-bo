import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps {
  size: number;
}

export const Container = styled.div<ContainerProps>`
.loader {
  margin: auto;
  border: ${props => props.size / 10}px solid #EAF0F6;
  border-radius: 50%;
  border-top: ${props => props.size / 10}px solid ${theme.colors.blueMain};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
