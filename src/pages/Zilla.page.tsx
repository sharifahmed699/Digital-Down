import { Fragment, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { CreateZillaModal } from '../modals/division/CreateZillaModal.modal';
import {
  useDeleteDistrictMutation,
  useGetDistrictQuery,
} from '../endpoints/districtApiSlice';
import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';
import toast from 'react-hot-toast';
import { DeleteModal } from '../modals/DeleteModal.modal';

const Zilla = () => {
  const [showCreateZillaModal, setShowCreateZillaModal] =
    useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<IGetAllDistrict | undefined>(
    undefined
  );

  const handleEditClick = (rowData: IGetAllDistrict | undefined) => {
    setEditData(rowData);
    setShowCreateZillaModal(true);
  };
  const columns: TableColumn<IGetAllDistrict | undefined>[] = [
    {
      name: 'ID',
      selector: (row) => row?.id ?? '--',
      sortable: true,
    },
    {
      name: 'District Name',
      selector: (row) => row?.name ?? '',
      sortable: true,
    },

    {
      name: 'Action',
      cell: (row) => (
        <>
          <button
            className="btn btn-link edit-icon pe-0"
            onClick={() => handleEditClick(row)}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
              <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
            </svg>
          </button>
          <button
            className="btn btn-link delete-icon pe-0"
            onClick={() => {
              setShowDeleteModal(true);
              setEditData(row);
            }}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const { isLoading, data } = useGetDistrictQuery(undefined);
  const [deleteUpoZila, { isLoading: isDeleteLoading, isSuccess }] =
    useDeleteDistrictMutation();

  const handleDelete = (id: number) => {
    deleteUpoZila(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully Delete !!');
      setShowDeleteModal(false);
      setEditData(undefined);
    }
  }, [isSuccess]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center loader-height bg-dark bg-opacity-10">
        Loading...
      </div>
    );
  }
  const districtData: (IGetAllDistrict | undefined)[] = data?.data
    ? data.data
    : [];

  return (
    <Fragment>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateZillaModal(true)}>
          {' '}
          Add District
        </button>
        <DataTable<IGetAllDistrict | undefined>
          columns={columns}
          data={districtData}
        />
      </div>

      {showCreateZillaModal && (
        <CreateZillaModal
          showCreateZillaModal={showCreateZillaModal}
          setShowCreateZillaModal={setShowCreateZillaModal}
          editData={editData}
          setEditData={setEditData}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
          deletedId={editData?.id}
          isDeleteLoading={isDeleteLoading}
          setClearData={setEditData}
        />
      )}
    </Fragment>
  );
};

export default Zilla;
