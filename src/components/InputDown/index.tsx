/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Container, Content, ContainerWrapper } from './styles';
import { trueApi } from '../../services/api';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line react/require-default-props
  label?: string;
  column?: any;
  columns?: any;
  cliente?: any;

}

export const InputDown: React.FC<InputProps> = ({ label, column, columns, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [dataList, setDataList] = useState([] as any);

  useEffect(() => {
    async function getCategory() {
      try {
        const { data } = await trueApi.get('/infoproduto/SelectCategoria?nomeFamilia=');
        console.log(data);
        await setDataList(data.listaCategorias);
      } catch {
        console.warn('Não foi possível buscar categorias');
      }
    }

    async function getSubCategory() {
      try {
        const queryFilter = columns[2].filterValue !== undefined ? columns[2].filterValue : ' ';
        const { data } = await trueApi.get(`/infoproduto/SelectSubCategorias?nomeCategoria=${queryFilter}`);
        await setDataList(data.listaCategorias);
      } catch {
        console.warn('Não foi possível buscar subcategorias.');
      }
    }

    if (column.Header == 'Categoria') getCategory();
    else if (column.Header == 'SubCategoria') getSubCategory();
  }, [columns[2].filterValue]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        <Content isFilled={isFilled} isFocused={isFocused}>
          <input
            key={column.Header}
            placeholder={column.Header}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            list={`${column.Header}list`}
            onChange={(event) => column.setFilter(event.target.value)}
            {...rest}
          />
          <datalist id={`${column.Header}list`}>
            {dataList?.map((item: any) => (
              <option
                key={item[`Cd${column.Header}`]}
                value={item[`Nome${column.Header}`]}
              >{item[`Nome${column.Header}`]}
              </option>
            ))}
          </datalist>

        </Content>
      </Container>
    </ContainerWrapper>
  );
};

export const Input: React.FC<InputProps> = ({ label, column, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        <Content isFilled={isFilled} isFocused={isFocused}>
          <input
            key={column.Header}
            placeholder={column.Header}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRef}
            list={`${column.Header}list`}
            onChange={(event) => column.setFilter(event.target.value)}
            {...rest}
          />
        </Content>
      </Container>
    </ContainerWrapper>
  );
};

export const InputCategoriesDown: React.FC<InputProps> = ({ column, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [data, setData] = useState([] as any);
  useEffect(() => {
    trueApi.get('/produto/SelecionarInfo').then(response => setData(response.data.categorias));
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        <Content isFilled={isFilled} isFocused={isFocused}>
          <input
            key={column.Header}
            placeholder={column.Header}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            list="listCategories"
            onChange={(event) => column.setFilter(event.target.value)}
            {...rest}
          />

          <datalist id="listCategories">
            {data.map((item: any) => (
              <option key={item.Cod} value={item.Nome}>{item.Nome}</option>
            ))}
          </datalist>

        </Content>
      </Container>
    </ContainerWrapper>
  );
};

export const InputClientesDown: React.FC<InputProps> = ({ column, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [clienteData, setClienteData] = useState([] as any);

  useEffect(() => {
    trueApi.get('/cliente/SelecionarTodos?pageNumber=0&limit=99999').then(response => setClienteData(response.data.Clientes));
  }, []);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        <Content isFilled={isFilled} isFocused={isFocused}>
          <input
            key={column.Header}
            placeholder={column.Header}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            list="listNotificacao"
            {...rest}
          />

          <datalist id="listNotificacao">
            {clienteData?.map((item: any) => (
              <option key={item.Id} value={item.RazaoSocial}>{item.RazaoSocial}</option>
            ))}
          </datalist>

        </Content>
      </Container>
    </ContainerWrapper>
  );
};
