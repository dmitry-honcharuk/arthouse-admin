import { Button, Divider, Form, Input, Typography } from '@pankod/refine-antd';
import {
  useDataProvider,
  useLogin,
  useNotification,
} from '@pankod/refine-core';
import { FC } from 'react';

export interface PasswordScreenForm {
  password: string;
  passwordConfirm: string;
}

interface Props {
  email: string;
  completed: boolean;
  onSuccess: (details: PasswordScreenForm) => void;
}

export const PasswordScreen: FC<Props> = ({ email, completed, onSuccess }) => {
  const [form] = Form.useForm<PasswordScreenForm>();

  const dataProviderFactory = useDataProvider();
  const notification = useNotification();
  const { mutate: login } = useLogin<PasswordScreenForm>();

  const dataProvider = dataProviderFactory();

  return (
    <>
      <Form<PasswordScreenForm>
        layout='vertical'
        form={form}
        onFinish={({ password, passwordConfirm }) => {
          const notify: typeof notification.open = notification?.open
            ? notification.open
            : ({ message }) => alert(message);

          if (!dataProvider.custom) {
            notify({
              type: 'error',
              message: 'No custom data provider',
            });

            return;
          }

          onSuccess({ password, passwordConfirm });
        }}
        requiredMark={false}
      >
        <Form.Item name='email' label='Email'>
          <Input disabled size='large' placeholder={email} type='email' />
        </Form.Item>

        <Divider />

        <Typography.Title level={5} className='title'>
          {completed ? 'Enter your password' : 'Setup new password'}
        </Typography.Title>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
        >
          <Input size='large' placeholder='Password' type='password' />
        </Form.Item>
        {!completed && (
          <Form.Item
            name='passwordConfirm'
            label='Confirm Password'
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input
              size='large'
              placeholder='Confirm Password'
              type='password'
            />
          </Form.Item>
        )}

        <Button type='primary' size='large' htmlType='submit' block>
          Proceed
        </Button>
      </Form>
    </>
  );
};
