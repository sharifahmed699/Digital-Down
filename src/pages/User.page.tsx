import { FC, Fragment, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { UserStatusUpdateModal } from '../modals/UserStatusUpdateModal.modal';
import { useGetUserQuery } from '../endpoints/authApiSlice';
import { IGetAllUser } from '../interfaces/users/IGetAllUser.interface';

const User: FC = () => {
  const [showUserStatusUpdateModal, setShowUserStatusUpdateModal] =
    useState<boolean>(false);

  const columns: TableColumn<IGetAllUser | undefined>[] = [
    {
      name: 'ID',
      selector: (row) => row?.id ?? '',
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row?.name ?? '',
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row?.email ?? '',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row?.genderType ?? '',
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row?.birthday ?? '',
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row) => row?.mobileNumber ?? '',
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => {
        return (
          <div className="d-flex align-items-center">
            {row?.isRegistered}
            <button
              className="btn btn-link edit-icon pe-0"
              onClick={() => setShowUserStatusUpdateModal(true)}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
              </svg>
            </button>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: 'Action',
      cell: () => (
        <button className="btn btn-link delete-icon pe-0">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
          </svg>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const { isLoading, data } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const users: (IGetAllUser | undefined)[] = data?.data ?? [];
  return (
    <Fragment>
      <div>
        <DataTable<IGetAllUser | undefined> columns={columns} data={users} />
      </div>

      {showUserStatusUpdateModal && (
        <UserStatusUpdateModal
          showUserStatusUpdateModal={showUserStatusUpdateModal}
          setShowUserStatusUpdateModal={setShowUserStatusUpdateModal}
        />
      )}
    </Fragment>
  );
};

export default User;
