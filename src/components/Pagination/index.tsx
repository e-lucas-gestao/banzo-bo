import { useEffect, useState } from 'react';

import { Container } from './styles';

interface PaginationProps {
  count: number;
}

export function Pagination({ count }: PaginationProps) {
  const [pages, setPages] = useState([] as number[]);

  useEffect(() => {
    let pageArray = [];
    let index = 1;
    for (let i = 0; i < count; i + 20) {
      pageArray.push(index);
      index += 1;
    }
    setPages(pageArray);
  }, []);

  return (
    <Container>
      {
        pages.map((item: any) => (
          <div key={item}>{item}</div>
        ))
      }
    </Container>
  );
}
