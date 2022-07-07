/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-duplicates */
import { useEffect, useRef, useState } from 'react';
import { variables } from '../../configuration/Constants';
import { ZoomImageModal } from '../ZoomImageModal';
import userDefaultImg from '../../assets/product_placeholder.png';
import productPlaceholderImg from '../../assets/product_placeholder.png';
import { Container } from './style';

interface ImageInputProps{
    inputType: string;
    path?: string;
}

export function ImagemProduto({ inputType, path }: ImageInputProps) {
  const [openModal, setOpenModal] = useState(false);
  const imagePath = `${variables.IMAGES_URL}/${inputType}/${path}`;

  return (
    <>
      <Container inputType={inputType}>
        <img
          src={path ? imagePath : inputType === 'produtos' ? productPlaceholderImg : userDefaultImg}
          alt="Sem foto de perfil"
          onClick={() => setOpenModal(true)}
        />
      </Container>
      {path &&
      <ZoomImageModal imageSource={imagePath} openModal={openModal} setOpenModal={setOpenModal} />}

    </>
  );
}
