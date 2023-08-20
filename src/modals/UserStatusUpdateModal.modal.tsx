import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { IUserStatusUpdateModalProps } from '../interfaces/modals/userStatusUpdateModal.interface';

export const UserStatusUpdateModal: FC<IUserStatusUpdateModalProps> = ({
  showUserStatusUpdateModal,
  setShowUserStatusUpdateModal,
  editData,
  setEditData,
}) => {
  console.log('ddddd', editData);
  const birthday = new Date(editData?.birthday!).toLocaleDateString();
  return (
    <Fragment>
      <Modal
        show={showUserStatusUpdateModal}
        onHide={() => setShowUserStatusUpdateModal(false)}
        centered
        size="xl"
        backdrop="static">
        <Modal.Header
          closeButton
          onHide={() => {
            setShowUserStatusUpdateModal(false);
          }}>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group list-group-horizontal d-flex mx-auto ">
            <li className="list-group-item">
              <span>Name: {editData?.name}</span>{' '}
            </li>
            <li className="list-group-item">
              <span>Name: {birthday}</span>{' '}
            </li>
            <li className="list-group-item">
              <span>Name: {editData?.nid}</span>{' '}
            </li>
            <li className="list-group-item">
              <span>Name: {editData?.district}</span>{' '}
            </li>
            <li className="list-group-item">
              <span>Name: {editData?.division}</span>{' '}
            </li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowUserStatusUpdateModal(false);
            }}>
            Close
          </button>
          <button type="button" className="btn btn-danger">
            Reject
          </button>
          <button type="button" className="btn btn-primary">
            Approve
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
