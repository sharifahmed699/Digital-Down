import { FC, Fragment, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { ICreateDivisionModalProps } from '../../interfaces/modals/createDivision.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useCreateDivisionMutation,
  useEditDivisionMutation,
} from '../../endpoints/divisionApiSlice';

export interface ICreateDivisionPayload {
  name: string;
}

export const CreateDivisionModal: FC<ICreateDivisionModalProps> = ({
  showCreateDivisionModal,
  setShowCreateDivisionModal,
  editData,
  setEditData,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<ICreateDivisionPayload>();

  const [createDivision, { isSuccess, isLoading: isCreatetLoading }] =
    useCreateDivisionMutation();
  const [editDivision, { isSuccess: isEditSuccess, isLoading: isEditLoading }] =
    useEditDivisionMutation();
  const handleCreateDivision: SubmitHandler<ICreateDivisionPayload> = (
    data
  ) => {
    if (editData) {
      editDivision({
        id: editData?.id,
        data: {
          name: data.name,
        },
      });
    } else {
      createDivision(data);
    }
  };
  useEffect(() => {
    if (editData) {
      setValue('name', editData.name);
    }
  }, [editData, setValue]);
  if (isSuccess || isEditSuccess) {
    setShowCreateDivisionModal(false);
    setEditData(undefined);
  }

  const handleCloseModal = () => {
    setShowCreateDivisionModal(false);
    setEditData(undefined);
  };
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
                handleCloseModal();
                clearErrors();
              }}>
              Close
            </button>
            <button
              disabled={isCreatetLoading || isEditLoading}
              type="submit"
              className="btn btn-primary">
              {(isCreatetLoading || isEditLoading) && (
                <span
                  className="spinner-border spinner-border-sm mx-3"
                  role="status"
                  aria-hidden="true"></span>
              )}
              {editData ? 'Update' : 'Create'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
