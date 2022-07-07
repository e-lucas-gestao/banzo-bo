import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { Container, Content, ErrorMessage, ContainerWrapper } from './styles';
import { Status } from '../Table/Status';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line react/require-default-props
  label?: string;

}

export const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ContainerWrapper>
      {label && <label htmlFor={name}> {label}</label> }
      <Container>
        <Content isFilled={isFilled} isFocused={isFocused}>
          <div {...rest.type && `className=${rest.type}`}>
            <input
              id={name}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              ref={inputRef}
              defaultValue={defaultValue}
              {...rest}
            />
          </div>

        </Content>
        {/* <ErrorMessage>{error ? <p>{error}</p> : <div />}</ErrorMessage> */}
      </Container>
    </ContainerWrapper>
  );
};
