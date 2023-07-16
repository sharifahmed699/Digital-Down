import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { IDeleteModalProps } from '../interfaces/modals/deleteModal.interface';

export const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
}: IDeleteModalProps) => {
  return (
    <Fragment>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered>
        <Fragment>
          <Modal.Body>Do you want to delete?</Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}>
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Delete
            </button>
          </Modal.Footer>
        </Fragment>
      </Modal>
    </Fragment>
  );
};
