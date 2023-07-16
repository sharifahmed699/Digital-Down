import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { IUserStatusUpdateModalProps } from '../interfaces/modals/userStatusUpdateModal.interface';

export const UserStatusUpdateModal: FC<IUserStatusUpdateModalProps> = ({
  showUserStatusUpdateModal,
  setShowUserStatusUpdateModal,
}) => {
  return (
    <Fragment>
      <Modal
        show={showUserStatusUpdateModal}
        onHide={() => setShowUserStatusUpdateModal(false)}
        centered
        backdrop="static">
        <Fragment>
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setShowUserStatusUpdateModal(false)}></button>
          </div>
          <Modal.Body>
            <div className="mb-4">
              <h5 className="text-center ">
                Do you want to Update User Status
              </h5>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <div className="d-flex flex-column w-75">
                <button className="btn btn-primary  py-2 mb-3">Yes</button>
                <button
                  className="btn btn-outline-secondary  py-2 mb-3"
                  onClick={() => setShowUserStatusUpdateModal(false)}>
                  No
                </button>
              </div>
            </div>
          </Modal.Body>
        </Fragment>
      </Modal>
    </Fragment>
  );
};
