/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-unneeded-ternary */
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Permission } from '../../pages/UserForm';
import { Content } from './styles';

interface UserPermissionsProps{
  checkbox: Permission[];
  setCheckbox: any;
  userId: any
}

export function UserPermissions({ checkbox, setCheckbox, userId }: UserPermissionsProps) {
  async function handleSubmit() {
    const formattedPermissionsData = checkbox.map(item => {
      const formattedPermission = {
        id_funcionalidade: item.CdFuncionalidade,
        tipo: item.Tipo ? item.Tipo : 0,
      };
      return formattedPermission;
    });
    sessionStorage.setItem('@User:permissions', JSON.stringify(formattedPermissionsData));
  }
  function handleCheckbox(value:any, id:any, checked:boolean) {
    const updatedCheckbox = [...checkbox];
    const currentOption = updatedCheckbox.find(item => item.CdFuncionalidade == id);
    if (currentOption) {
      if (checked) {
        currentOption.Tipo = (value > currentOption.Tipo ? value : currentOption.Tipo);
      } else {
        currentOption.Tipo = value - 1;
      }
    }
    setCheckbox(updatedCheckbox);
    handleSubmit();
  }
  return (
    <>
      <h2>Editar</h2>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Módulos</th>
              <th>Visualização</th>
              <th>Edição</th>
            </tr>
          </thead>
          <tbody>
            {
            checkbox.map((permission) => (
              <tr key={permission.CdFuncionalidade}>
                <td>
                  <p>{permission.Funcionalidade}</p>
                </td>
                <td>
                  <Checkbox
                    value="1"
                    name={`${permission.CdFuncionalidade}`}
                    id={`${permission.CdFuncionalidade}`}
                    onChange={(event) => handleCheckbox(event.target.value, event.target.id, event.target.checked)}
                    checked={permission.Tipo >= 1 ? true : false}
                  />
                </td>
                <td>
                  <Checkbox
                    value="2"
                    name={`${permission.CdFuncionalidade}`}
                    id={`${permission.CdFuncionalidade}`}
                    onChange={(event) => handleCheckbox(event.target.value, event.target.id, event.target.checked)}
                    checked={permission.Tipo >= 2 ? true : false}
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
