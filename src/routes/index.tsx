/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { trueApi } from '../services/api';

import { Login } from '../pages/Login';
import { ForgotPassword } from '../pages/ForgotPassword';
import { Dashboard } from '../pages/Dashboard';
import { Employees } from '../pages/Employees';
import { EmployeeForm } from '../pages/EmployeeForm';
import { Requests } from '../pages/Requests';
import { RequestForm } from '../pages/RequestForm';
import { NewPassword } from '../pages/NewPassword';
import { UserPanel } from '../pages/UserPanel';
import { UserForm } from '../pages/UserForm';
import { CreateUserForm } from '../pages/CreateUserForm';
import { Products } from '../pages/Products';
import { ProductForm } from '../pages/ProductForm';
import { Clients } from '../pages/Clients';
import { ClientForm } from '../pages/ClientForm';
import { NotificationsPush } from '../pages/NotificationsPush';
import { NotificationPushForm } from '../pages/NotificationPushForm';
import { CreateNotificationPushForm } from '../pages/CreateNotificationPushForm';
import { Banners } from '../pages/Banners';
import { CreateBanner } from '../pages/CreateBanner';
import { PrintQrCode } from '../pages/PrintQrCode';
import { EditBanner } from '../pages/EditBanner';

import { Sidebar } from '../components/Sidebar';
import { Userbar } from '../components/Userbar';

import { Container, Content } from '../styles/routes';

import useAxios from '../hooks/useAxios';
import { encryptor, keySessionStorage } from '../configuration/Constants';

// don't need return when your return is the whole content of the function
export const Routing: React.FC = () => {
  const api = useAxios();

  return (
    <Routes>
      <Route>

        <Route path="login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="print-qr" element={<PrintQrCode />} />
        <Route
          path="/*"
          element={!sessionStorage.getItem(keySessionStorage.KEY_ID) ? <Navigate to="/login" /> : <Layout />}
        />
      </Route>
    </Routes>
  );

  function Layout() {
    let parse:any;
    try {
      const session = encryptor.decrypt(sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS));
      parse = session ? JSON.parse(session) : false;
      console.log('parse', parse);
    } catch (error) {
      console.log(error);
    }

    const routes = [
      [
        <Route path="/" element={<Dashboard />} />,
      ],
      [
        <Route path="requests" element={<Requests />} />,
        <Route path="requests-form/:id" element={<RequestForm />} />,
      ],
      [
        <Route path="/users" element={<UserPanel />} />,
        <Route path="/user-form/:id*" element={<UserForm />} />,
        <Route path="/create-user" element={<CreateUserForm />} />,
      ],
      // [
      //   <Route path="/employees" element={<Employees />} />,
      //   <Route path="employee-form/:id" element={<EmployeeForm />} />,
      // ],
      // [
      //   <Route path="/clients" element={<Clients />} />,
      //   <Route path="/client-form/:id" element={<ClientForm />} />,
      // ],
      // [
      //   <Route path="/banners" element={<Banners />} />,
      //   <Route path="/create-banner" element={<CreateBanner />} />,
      //   <Route path="/edit-banner/:id" element={<EditBanner />} />,
      // ],
      // null,
      // null,
      null,
    ];

    return (

      <Container>
        <Content>
          <Sidebar />
          <div id="separator">
            <Userbar />

            <Routes>
              {
                  parse && routes.map((item, index) => {
                    if (parse[index]) { if (parse[index].Tipo > 0) return item; }
                    return null;
                  })
              }
            </Routes>

          </div>
        </Content>
      </Container>
    );
  }
};
