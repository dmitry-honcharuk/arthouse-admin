import {
  ErrorComponent,
  notificationProvider,
  ReadyPage,
} from '@pankod/refine-antd';
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import dataProvider from '@pankod/refine-simple-rest';
import {
  Footer,
  Header,
  Layout,
  OffLayoutArea,
  Sider,
  Title,
} from 'components/layout';
import { Login } from 'components/layout/login/login';
import { APP_ROOT_URL } from 'config';
import { UserShow, UsersList } from 'pages/users';
import 'styles/antd.less';
import { authProvider } from './authProvider';

function App() {
  return (
    <Refine
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      dataProvider={dataProvider(APP_ROOT_URL)}
      authProvider={authProvider}
      LoginPage={Login}
      resources={[{ name: 'users', list: UsersList, show: UserShow }]}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    />
  );
}

export default App;
