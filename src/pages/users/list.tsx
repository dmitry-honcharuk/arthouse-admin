import {
  BooleanField,
  EmailField,
  Icons,
  List,
  ShowButton,
  Space,
  Table,
  TextField,
  useTable,
} from '@pankod/refine-antd';
import { User } from 'interfaces';
import React from 'react';

const { CheckSquareOutlined, MinusSquareOutlined } = Icons;
export const UsersList: React.FC = () => {
  const { tableProps, sorter } = useTable<User>({
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
          dataIndex='email'
          key='email'
          title='Email'
          render={(value) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex={['profile', 'firstName']}
          key='firstName'
          title='First Name'
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={['profile', 'lastName']}
          key='lastName'
          title='Last Name'
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex='admin'
          title='Admin'
          render={(value) => (
            <BooleanField
              value={!!value}
              trueIcon={<CheckSquareOutlined />}
              falseIcon={<MinusSquareOutlined />}
              valueLabelTrue='admin'
              valueLabelFalse='non admin'
            />
          )}
        />
        <Table.Column<User>
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
