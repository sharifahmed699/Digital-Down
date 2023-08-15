import { Fragment, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { CreateUpoZillaModal } from '../modals/upoZilla/CreateUpoZillaModal.modal';
import { useGetUpoZilaQuery } from '../endpoints/upoZillaApiSlice';
import { IGetAllDistrict } from '../interfaces/district/IGetAllDistrict.interface';

const UpoZilla = () => {
  const [showCreateUpoZillaModal, setShowCreateUpoZillaModal] =
    useState<boolean>(false);
  const [editUpoZillaData, setEditUpoZillaData] = useState<
    IGetAllDistrict | undefined
  >(undefined); // Step 1

  const handleEditClick = (rowData: IGetAllDistrict | undefined) => {
    setEditUpoZillaData(rowData); // Step 2
    setShowCreateUpoZillaModal(true);
  };
  const columns: TableColumn<IGetAllDistrict | undefined>[] = [
    {
      name: 'ID',
      selector: (row) => row?.id ?? '--',
      sortable: true,
    },
    {
      name: 'Upozilla Name',
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
          <button className="btn btn-link delete-icon pe-0">
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
  const { isLoading, data } = useGetUpoZilaQuery(undefined);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center loader-height bg-dark bg-opacity-10">
        <div>Loading...</div>
      </div>
    );
  }
  const upoZilaData: (IGetAllDistrict | undefined)[] = data?.data
    ? data.data
    : [];

  return (
    <Fragment>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateUpoZillaModal(true)}>
          {' '}
          Add UpoZilla
        </button>
        <DataTable<IGetAllDistrict | undefined>
          columns={columns}
          data={upoZilaData}
        />
      </div>

      {showCreateUpoZillaModal && (
        <CreateUpoZillaModal
          showCreateUpoZillaModal={showCreateUpoZillaModal}
          setShowCreateUpoZillaModal={setShowCreateUpoZillaModal}
          editUpoZillaData={editUpoZillaData}
          setEditUpoZillaData={setEditUpoZillaData}
        />
      )}
    </Fragment>
  );
};

export default UpoZilla;
