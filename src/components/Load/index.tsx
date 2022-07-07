import { Container } from './styles';

interface LoadProps{
  size: number;
}

export function Load({ size }: LoadProps) {
  return (
    <Container size={size}>
      <div className="loader" />
    </Container>
  );
}
