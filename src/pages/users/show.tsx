import { Show, Tag, Typography } from '@pankod/refine-antd';
import { IResourceComponentsProps, useShow } from '@pankod/refine-core';

import { User } from '../../interfaces/User';

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const {
    queryResult: { data: { data: record } = {}, isLoading },
  } = useShow<User>();

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.email}</Text>

      <Title level={5}>Is admin</Title>
      <Text>
        <Tag>{record?.admin ? 'admin' : 'non admin'}</Tag>
      </Text>
    </Show>
  );
};
