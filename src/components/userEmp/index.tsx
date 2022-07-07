/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-unneeded-ternary */
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

import { Permission } from '../../pages/UserForm';
import { Content } from './styles';

interface UserEmpresaProps{
  checkEmp: Permission[];
  setCheckEmp: any;
  userId: any
}

export function UserEmpresa({ checkEmp: checkemp, setCheckEmp: setCheckemp, userId }: UserEmpresaProps) {
  async function handleSubmit() {
    const formattedPermissionsData = checkemp.map(item => {
      const formattedPermission = {
        id_funcionalidade: item.CdEmpresa,
        tipo: item.Tipo ? item.Tipo : 0,
      };
      return formattedPermission;
    });
    sessionStorage.setItem('@User', JSON.stringify(formattedPermissionsData));
  }
  function handleCheckbox(value:any, id:any, checked:boolean) {
    const updatedCheckbox = [...checkemp];
    const currentOption = updatedCheckbox.find(item => item.CdEmpresa == id);
    if (currentOption) {
      if (checked) {
        currentOption.Tipo = (value > currentOption.Tipo ? value : currentOption.Tipo);
      } else {
        currentOption.Tipo = value - 1;
      }
    }
    setCheckemp(updatedCheckbox);
    handleSubmit();
  }
  console.log({ checkbox: checkemp });
  return (
    <>
      <h2>Editar</h2>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Empresas</th>
              <th>Relação</th>
            </tr>
          </thead>
          <tbody>
            {
            checkemp.map((permission) => (
              <tr key={permission.CdEmpresa}>
                <td>
                  <p>{permission.Empresa}</p>
                </td>
                <td>
                  <Checkbox
                    value="1"
                    name={`${permission.CdEmpresa}`}
                    id={`${permission.CdEmpresa}`}
                    onChange={(event) => handleCheckbox(event.target.value, event.target.id, event.target.checked)}
                    checked={permission.Tipo >= 1 ? true : false}
                  />
                </td>
              </tr>
            ))
          }
          </tbody>

        </table>

        <div id="button">
          <Button type="submit">Salvar</Button>
        </div>

      </Content>
    </>
  );
}
