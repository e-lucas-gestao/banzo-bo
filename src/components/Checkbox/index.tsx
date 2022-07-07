import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
} from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line react/require-default-props
  label?: string;
}

export const Checkbox: React.FC<SelectProps> = ({ name, label, ...rest }) => {
  const selectRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <input
        {...rest}
        type="checkbox"
        ref={selectRef}
        id={name}
      />
      {label && <label htmlFor={name}>{label}</label>}
    </Container>
  );
};
