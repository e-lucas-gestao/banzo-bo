import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { ReactComponent as ArrowSortableSVG } from '../../assets/arrowSortableIcon.svg';
import { ReactComponent as DragIconSVG } from '../../assets/dragIcon.svg';

export const ArrowSortable = styled(ArrowSortableSVG)`
  margin-left:auto;
  padding-bottom: 0.2rem;
`;

export const DragIcon = styled(DragIconSVG)`
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  padding-bottom: 0.2rem;
`;

interface liProps {
  pressed: boolean;
}

export const None = styled.div`
  display: hidden;
`;

export const Ul = styled.ul<liProps>`
  cursor: ${(props) => (props.pressed ? 'grabbing' : 'grab')};
  list-style-type: none;
  width:98%;
  align-items:center;
`;

export const Li = styled.li`
 display: flex;
 flex-direction: row;
 align-items: center;
 margin:0.5rem;
 padding:0.2rem;
 border-radius: 1rem;
 background-color: ${theme.colors.background};
 width:100%;
 border: 1.5px solid ${theme.colors.borderColor};
 z-index: 10000;
 list-style-type:none;
 
`;

export const P_li = styled.p`
  font-size:13px;
  
  margin-left: 2rem;
`;
