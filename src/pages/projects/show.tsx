import { Show, Typography } from '@pankod/refine-antd';
import { IResourceComponentsProps, useShow } from '@pankod/refine-core';
import { Project } from 'interfaces';

const { Title } = Typography;

export const ProjectShow: React.FC<IResourceComponentsProps> = () => {
  const {
    queryResult: { data: { data: record } = {}, isLoading },
  } = useShow<Project>();

  return (
    <Show isLoading={isLoading}>
      <Title level={2}>{record?.name}</Title>
    </Show>
  );
};
