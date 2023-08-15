import { FC, Fragment, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ICreatePouroSovaModalProps } from '../../interfaces/modals/createPouroSovainterface';
import { ICreatePouroSovaPayload } from '../../interfaces/pouroSova/ICreatePouroSovaPayload.interface';
import { useGetUpoZilaQuery } from '../../endpoints/upoZillaApiSlice';
import {
  useCreatePouroSovaMutation,
  useEditPouroSovaMutation,
} from '../../endpoints/pouroSovaApiSlice';

export interface IOption {
  label: string;
  value: string;
}

export const CreatePouroSovaModal: FC<ICreatePouroSovaModalProps> = ({
  showCreatePouroSovaModal,
  setShowCreatePouroSovaModal,
  editData,
  setEditData,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
    setValue,
  } = useForm<ICreatePouroSovaPayload>();

  const { isLoading, data } = useGetUpoZilaQuery(undefined);
  const [createPouroSova, { isSuccess, isLoading: isCreatetLoading }] =
    useCreatePouroSovaMutation();
  const [
    editPouroSova,
    { isSuccess: isEditSuccess, isLoading: isEditLoading },
  ] = useEditPouroSovaMutation();
  const handleCreatePouroSova: SubmitHandler<ICreatePouroSovaPayload> = (
    data
  ) => {
    if (editData) {
      editPouroSova({
        id: editData?.id,
        data: {
          name: data.name,
        },
      });
    } else {
      createPouroSova(data);
    }
  };
  useEffect(() => {
    if (editData) {
      setValue('name', editData.name);
      setValue('upozilaId', editData.id.toString());
    }
  }, [editData, setValue]);
  const upoZillaOptions = data?.data?.map((item: any) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  if (isSuccess || isEditSuccess) {
    setShowCreatePouroSovaModal(false);
    setEditData(undefined);
  }

  const handleCloseModal = () => {
    setShowCreatePouroSovaModal(false);
    setEditData(undefined);
  };
  return (
    <Fragment>
      <Modal
        backdrop="static"
        show={showCreatePouroSovaModal}
        onHide={() => {
          setShowCreatePouroSovaModal?.(false);
          handleCloseModal();
        }}
        centered>
        <form onSubmit={handleSubmit(handleCreatePouroSova)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
              handleCloseModal();
            }}>
            <Modal.Title>
              {' '}
              {editData ? 'Update' : 'Create'} Pouro Sova
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Pouro Sova Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('name', {
                      required: 'pouro sova Name is required',
                    })}
                    type="text"
                    className={`form-control ${errors.name && 'is-invalid'}`}
                    placeholder="PouroSova Name"
                  />
                  <small className="text-danger">{errors.name?.message}</small>
                </div>
              </div>
              {!editData && (
                <div className="mb-3">
                  <label className="form-label">
                    Zilla Name <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="upozilaId"
                    control={control}
                    render={({ field: { name, onChange, ref, value } }) => (
                      <Select
                        ref={ref}
                        name={name}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        value={upoZillaOptions?.filter((option: IOption) => {
                          return value?.includes(option.value as string);
                        })}
                        options={upoZillaOptions}
                        onChange={(selectedOption: IOption | null) => {
                          const newValue = selectedOption?.value || '';
                          onChange(newValue);
                        }}
                      />
                    )}
                  />
                  <small className="text-danger">
                    {errors.upozilaId?.message}
                  </small>
                </div>
              )}
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
