import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { trueApi } from '../../services/api';
import { variables, keySessionStorage } from '../../configuration/Constants';

import userDefaultImg from '../../assets/user_placeholder.png';
import { Container } from './styles';
import { ChangePasswordModal } from '../ChangePasswordModal';

export const Userbar: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [showForm, setShowForm] = useState(false);
  const id = sessionStorage.getItem('id');

  useMemo(() => {
    async function fetchUserData() {
      try {
        const response = await trueApi.get(`/usuario/${id}`);
        setData(response.data.usuario);
      } catch {
        console.warn('Erro ao buscar dados');
      }
    }

    fetchUserData();
  }, [id]);

  function handleLogout() {
    sessionStorage.removeItem(keySessionStorage.KEY_TOKEN);
    sessionStorage.removeItem(keySessionStorage.KEY_PERMISSIONS);
    sessionStorage.removeItem(keySessionStorage.KEY_ID);
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      <Container>
        <div id="content">
          <div id="user-info">
            <p>{data?.email}</p>
            <img
              src={
              (data?.CaminhoImg ? `${variables.IMAGES_URL}/usuarios/${data.CaminhoImg}`
                : userDefaultImg)
}
              alt="User"
            />
          </div>
          <nav id="menu">
            <button type="button" onClick={() => setShowForm(true)}>Mudar senha</button>
            <button type="button" onClick={() => handleLogout()}>Sair</button>
          </nav>
        </div>
        <ChangePasswordModal showForm={showForm} setShowForm={setShowForm} />
      </Container>
    </>
  );
};
