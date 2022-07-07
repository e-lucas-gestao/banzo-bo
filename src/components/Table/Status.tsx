import { StatusContainer } from './styles';
import { messages } from '../../utils/statusMessage';

interface StatusProps {
  value: number;
  id: string;
  statusForm?: boolean;
}

export const Status = ({ value, id, statusForm } : StatusProps) => {
  const message = () => {
    if (id === 'StatusSolicitacao') {
      const [filteredStatus] = messages[id].filter((item:any) => item.value === value);
      return filteredStatus;
    }
    return messages[id][value];
  };

  return (
    <StatusContainer statusForm={statusForm} color={message()?.color} id={id}>
      <span>
        <div />
        <p> {message()?.message} </p>
      </span>
    </StatusContainer>
  );
};
