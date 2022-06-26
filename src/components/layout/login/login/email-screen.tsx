import { Button, Form, Input } from '@pankod/refine-antd';
import { useDataProvider, useNotification } from '@pankod/refine-core';
import { APP_ROOT_URL } from 'config';
import { FC } from 'react';

export interface EmailScreenForm {
  email: string;
}

interface Props {
  onSuccess: (details: { email: string; completed: boolean }) => void;
}

export const EmailScreen: FC<Props> = ({ onSuccess }) => {
  const [form] = Form.useForm<EmailScreenForm>();

  const dataProviderFactory = useDataProvider();
  const notification = useNotification();

  const dataProvider = dataProviderFactory();

  return (
    <Form<EmailScreenForm>
      layout='vertical'
      form={form}
      onFinish={({ email }) => {
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

        dataProvider
          .custom<{ noPassword?: boolean }>({
            method: 'get',
            url: APP_ROOT_URL,
            query: { email },
          })
          .then(({ data }) => onSuccess({ email, completed: !data.noPassword }))
          .catch((e) =>
            notify({
              type: 'error',
              message: e.message,
            }),
          );
      }}
      requiredMark={false}
    >
      <Form.Item
        name='email'
        label='Email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail',
          },
          {
            required: true,
            message: 'Please input your E-mail',
          },
        ]}
      >
        <Input size='large' placeholder='Email' type='email' />
      </Form.Item>

      <Button type='primary' size='large' htmlType='submit' block>
        Proceed
      </Button>
    </Form>
  );
};
