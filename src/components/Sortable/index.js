/* eslint-disable no-unused-expressions */
import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Li, Ul, ArrowSortable, DragIcon, P_li } from './style';

const SortableItem = sortableElement(({ value }) => (
<Li><DragIcon /> <P_li> {value} </P_li>  <ArrowSortable /></Li>
));

const SortableContainer = sortableContainer(({ children, setPress, press }) => {
  let pressed = press;
  useEffect(() => {
    pressed = press;
  }, [press]);
  return (<Ul onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)} pressed={pressed}>{children}</Ul>);
});

export function Sortable({ setColumns, listColumns }) {
  const [headers, setHeader] = useState({ items: [...listColumns].filter((a) => a.Header !== 'Ação') });
  const [press, setPress] = useState(false); 

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setHeader(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  useEffect(() => {
    setColumns([...headers.items]);
  }, [headers]);

  return (
    <SortableContainer
      press={press}
      setPress={setPress}
      axis="y"
      lockAxis="y"
      lockToContainerEdges
      lockOffset="0%"
      onSortEnd={onSortEnd}
    >
      {headers.items.map((value, index) => value.id!=="selection" ? (
        <SortableItem key={`item-${value.header}-${index}`} index={index} value={value.Header} />
      ): <></>)}
    </SortableContainer>
  );
}

export default Sortable;
