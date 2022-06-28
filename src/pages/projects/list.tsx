import {
  EmailField,
  getDefaultSortOrder,
  Icons,
  List,
  ShowButton,
  Space,
  Table,
  useTable,
} from '@pankod/refine-antd';
import { Project } from 'interfaces';
import React from 'react';

const { CheckSquareOutlined, MinusSquareOutlined } = Icons;

export const ProjectList: React.FC = () => {
  const { tableProps, sorter } = useTable<Project>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column
          dataIndex='name'
          key='name'
          title='Name'
          render={(value) => <EmailField value={value} />}
        />
        <Table.Column<Project>
          dataIndex={['user', 'id']}
          key='id'
          title='User'
          render={(id, record) => (
            <ShowButton
              resourceNameOrRouteName='users'
              size='small'
              recordItemId={record.user.id}
            >
              {record.user.email}
            </ShowButton>
          )}
          defaultSortOrder={getDefaultSortOrder('name', sorter)}
        />
        <Table.Column<Project>
          title='Actions'
          dataIndex='actions'
          render={(_, record) => (
            <Space>
              <ShowButton hideText size='small' recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
