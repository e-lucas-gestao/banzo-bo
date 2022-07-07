import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { getValidationErrors } from '../../utils/getValidationError';
import { Input } from '../Input';
import { Button } from '../Button';

import closeButtonImg from '../../assets/close_button.svg';
import { Container } from './styles';
import { trueApi } from '../../services/api';

interface ModalProps {
  setOpenModal: (showForm: boolean) => void;
  openModal: boolean;
  imageSource: string;
}

export function ZoomImageModal({ setOpenModal, openModal, imageSource }: ModalProps) {
  return (
    <Container showForm={openModal}>
      <div id="content">
        <button
          type="button"
          onClick={() => setOpenModal(false)}
        >
          <img src={closeButtonImg} alt="Fechar" />
        </button>
        <img src={imageSource} alt="Produto" />
      </div>
    </Container>
  );
}
