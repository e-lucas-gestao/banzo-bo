/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { toast } from 'react-toastify';
import { Container } from './styles';
import { variables } from '../../configuration/Constants';

import userDefaultImg from '../../assets/user_placeholder.png';
import productPlaceholderImg from '../../assets/product_placeholder.png';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement>{
  inputType: string;
  path?: string;
}

export function ImageInput({ inputType, path }: ImageInputProps) {
  const [image, setImage] = useState<any>(null);
  const imagePath = `${variables.IMAGES_URL}/${inputType}/${path}`;

  const imagemAccept = [
    'image/jpeg',
    'image/png',
  ];

  function validFileType(file:any):boolean {
    return imagemAccept.includes(file?.type);
  }

  function imageGetter(event:any) {
    const files: any = Array.from(event.target.files);

    validFileType(files[0]) ?
      setImage(files[0]) :
      toast.error('Tipo de arquivo invalido');
  }

  const { fieldName, defaultValue, error, registerField, ...rest } = useField('profileImage');
  const imgRef = useRef(null);

  useEffect(() => {
    validFileType(image) &&
      registerField({
        name: fieldName,
        ref: imgRef.current,
        path: 'files[0]',
      });
  }, [fieldName, registerField, image]);

  return (
    <Container inputType={inputType}>
      { image ?
        <img src={URL.createObjectURL(image)} alt="Foto de Perfil" /> :
        <img src={path ? imagePath : inputType !== 'usuarios' ? productPlaceholderImg : userDefaultImg} alt="Sem foto de perfil" />}
      <span>Mudar imagem</span>
      <input {...rest} type="file" accept=".png, .jpg, .jpeg, .jfif" ref={imgRef} name="profileImage" onChange={(event: any) => imageGetter(event)} />
    </Container>
  );
}
