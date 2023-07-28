import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { ICreateDivisionModalProps } from '../../interfaces/modals/createDivision.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateDivisionMutation } from '../../endpoints/divisionApiSlice';

export interface ICreateDivisionPayload {
  name: string;
}

export const CreateDivisionModal: FC<ICreateDivisionModalProps> = ({
  showCreateDivisionModal,
  setShowCreateDivisionModal,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ICreateDivisionPayload>();

  const [createDivision, { isSuccess }] = useCreateDivisionMutation();
  const handleCreateDivision: SubmitHandler<ICreateDivisionPayload> = (
    data
  ) => {
    createDivision(data);
  };
  if (isSuccess) {
    setShowCreateDivisionModal(false);
  }
  return (
    <Fragment>
      <Modal
        backdrop="static"
        show={showCreateDivisionModal}
        onHide={() => setShowCreateDivisionModal?.(false)}
        centered>
        <form onSubmit={handleSubmit(handleCreateDivision)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}>
            <Modal.Title>Create Division</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Division Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('name', {
                      required: 'Division Name is required',
                    })}
                    type="text"
                    className={`form-control ${errors.name && 'is-invalid'}`}
                    placeholder="Division Name"
                  />
                  <small className="text-danger">{errors.name?.message}</small>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCreateDivisionModal?.(false);
                clearErrors();
              }}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
