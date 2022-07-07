import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/Sidebar';
import { Userbar } from '../components/Userbar';
import { Dashboard } from '../pages/Dashboard';
import { Employees } from '../pages/Employees';
import { Requests } from '../pages/Requests';
import { RequestForm } from '../pages/RequestForm';
import { NewPassword } from '../pages/NewPassword';
import { UserPanel } from '../pages/UserPanel';
import { UserForm } from '../pages/UserForm';

export const Logged: React.FC = () => (
  <>
  </>
);
