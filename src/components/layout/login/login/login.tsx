import { AntdLayout, Card, Col, Row, Typography } from '@pankod/refine-antd';
import { useLogin } from '@pankod/refine-core';
import { useState } from 'react';
import { EmailScreen } from './email-screen';
import { PasswordScreen } from './password-screen';

interface LoginForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

enum Screen {
  Email = 'email',
  Password = 'password',
}

type ScreenState =
  | { screen: Screen.Email }
  | { screen: Screen.Password; email: string; completed: boolean };

export function Login() {
  const [screenState, setScreenState] = useState<ScreenState>({
    screen: Screen.Email,
  });

  const { mutate: login } = useLogin<LoginForm>();

  return (
    <AntdLayout className='layout'>
      <AntdLayout.Content>
        <Row
          justify='center'
          align='middle'
          style={{
            height: '100vh',
          }}
        >
          <Col xs={22}>
            <div className='container'>
              <Card
                title={
                  <Typography.Title level={3} className='title'>
                    Sign in your account
                  </Typography.Title>
                }
              >
                {screenState.screen === Screen.Email && (
                  <EmailScreen
                    onSuccess={({ email, completed }) => {
                      setScreenState({
                        screen: Screen.Password,
                        email,
                        completed,
                      });
                    }}
                  />
                )}
                {screenState.screen === Screen.Password && (
                  <PasswordScreen
                    email={screenState.email}
                    completed={screenState.completed}
                    onSuccess={({ password, passwordConfirm }) =>
                      login({
                        email: screenState.email,
                        password,
                        passwordConfirm,
                      })
                    }
                  />
                )}
              </Card>
            </div>
          </Col>
        </Row>
      </AntdLayout.Content>
    </AntdLayout>
  );
}
