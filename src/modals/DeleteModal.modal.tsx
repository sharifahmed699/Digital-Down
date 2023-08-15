import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { IDeleteModalProps } from '../interfaces/modals/deleteModal.interface';

export const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDelete,
  deletedId,
  isDeleteLoading,
  setClearData,
}: IDeleteModalProps) => {
  return (
    <Fragment>
      <Modal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setClearData(undefined);
        }}
        centered>
        <Fragment>
          <Modal.Body>Do you want to delete?</Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setClearData(undefined);
              }}>
              Close
            </button>
            <button
              disabled={isDeleteLoading}
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleDelete(deletedId!);
                // setShowDeleteModal(false);
              }}>
              {isDeleteLoading && (
                <span
                  className="spinner-border spinner-border-sm mx-3"
                  role="status"
                  aria-hidden="true"></span>
              )}
              Delete
            </button>
          </Modal.Footer>
        </Fragment>
      </Modal>
    </Fragment>
  );
};
