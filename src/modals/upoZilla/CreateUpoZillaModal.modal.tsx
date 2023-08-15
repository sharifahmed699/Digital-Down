import { FC, Fragment, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreateUpoZillaModalProps } from '../../interfaces/modals/createUpoZilla.interface';
import { useGetDistrictQuery } from '../../endpoints/districtApiSlice';
import {
  useCreateUpoZilaMutation,
  useEditUpoZilaMutation,
} from '../../endpoints/upoZillaApiSlice';
import { ICreateUpoZillaPayload } from '../../interfaces/upozilla/ICreateUpoZillaPayload.interface';

export interface IOption {
  label: string;
  value: string;
}

export const CreateUpoZillaModal: FC<ICreateUpoZillaModalProps> = ({
  showCreateUpoZillaModal,
  setShowCreateUpoZillaModal,
  editUpoZillaData,
  setEditUpoZillaData,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<ICreateUpoZillaPayload>();

  const { isLoading, data } = useGetDistrictQuery(undefined);
  const [createUpoZila, { isSuccess, isLoading: isCreatetLoading }] =
    useCreateUpoZilaMutation();
  const [editUpoZila, { isSuccess: isEditSuccess, isLoading: isEditLoading }] =
    useEditUpoZilaMutation();
  const handleCreateDivision: SubmitHandler<ICreateUpoZillaPayload> = (
    data
  ) => {
    if (editUpoZillaData) {
      editUpoZila({
        id: editUpoZillaData?.id,
        data: {
          name: data.name,
        },
      });
    } else {
      createUpoZila(data);
    }
  };

  useEffect(() => {
    if (editUpoZillaData) {
      setValue('name', editUpoZillaData.name);
      setValue('districtId', editUpoZillaData.id.toString());
    }
  }, [editUpoZillaData, setValue]);
  const zillaOptions = data?.data?.map((item: any) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  if (isSuccess || isEditSuccess) {
    setShowCreateUpoZillaModal(false);
    setEditUpoZillaData(undefined);
  }

  const handleCloseModal = () => {
    setShowCreateUpoZillaModal(false);
    setEditUpoZillaData(undefined);
  };
  return (
    <Fragment>
      <Modal
        backdrop="static"
        show={showCreateUpoZillaModal}
        onHide={() => setShowCreateUpoZillaModal?.(false)}
        centered>
        <form onSubmit={handleSubmit(handleCreateDivision)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
              handleCloseModal();
            }}>
            <Modal.Title>Create UpoZilla</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    UpoZilla Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('name', {
                      required: 'Upo Zilla Name is required',
                    })}
                    type="text"
                    className={`form-control ${errors.name && 'is-invalid'}`}
                    placeholder="UpoZilla Name"
                  />
                  <small className="text-danger">{errors.name?.message}</small>
                </div>
              </div>
              {!editUpoZillaData && (
                <div className="mb-3">
                  <label className="form-label">
                    Zilla Name <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="districtId"
                    control={control}
                    render={({ field: { name, onChange, ref, value } }) => (
                      <Select
                        ref={ref}
                        name={name}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        value={zillaOptions?.filter((option: IOption) => {
                          return value?.includes(option.value as string);
                        })}
                        options={zillaOptions}
                        onChange={(selectedOption: IOption | null) => {
                          const newValue = selectedOption?.value || '';
                          onChange(newValue);
                        }}
                      />
                    )}
                  />
                  <small className="text-danger">
                    {errors.districtId?.message}
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
                reset();
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
              {editUpoZillaData ? 'Update' : 'Create'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
