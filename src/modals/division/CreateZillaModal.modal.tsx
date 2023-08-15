import { FC, Fragment, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreateZillaModalProps } from '../../interfaces/modals/createZilla.interface';
import { useGetDivisionQuery } from '../../endpoints/divisionApiSlice';
import {
  useCreateDistrictMutation,
  useEditDistrictMutation,
} from '../../endpoints/districtApiSlice';
import { ICreateZillaPayload } from '../../interfaces/district/ICreateDistrictPayload.interface';

export interface IOption {
  label: string;
  value: string;
}

export const CreateZillaModal: FC<ICreateZillaModalProps> = ({
  showCreateZillaModal,
  setShowCreateZillaModal,
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
  } = useForm<ICreateZillaPayload>();

  const { isLoading, data } = useGetDivisionQuery(undefined);
  const [createDistrict, { isSuccess, isLoading: isCreatetLoading }] =
    useCreateDistrictMutation();
  const [editDistrict, { isSuccess: isEditSuccess, isLoading: isEditLoading }] =
    useEditDistrictMutation();
  const handleCreateDivision: SubmitHandler<ICreateZillaPayload> = (data) => {
    if (editData) {
      editDistrict({
        id: editData?.id,
        data: {
          name: data.name,
        },
      });
    } else {
      createDistrict(data);
    }
  };

  useEffect(() => {
    if (editData) {
      setValue('name', editData.name);
      setValue('divisionId', editData.id.toString());
    }
  }, [editData, setValue]);
  const divisionOptions = data?.data?.map((item: any) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  if (isSuccess || isEditSuccess) {
    setShowCreateZillaModal(false);
    setEditData(undefined);
  }

  const handleCloseModal = () => {
    setShowCreateZillaModal(false);
    setEditData(undefined);
  };

  return (
    <Fragment>
      <Modal
        backdrop="static"
        show={showCreateZillaModal}
        onHide={() => setShowCreateZillaModal?.(false)}
        centered>
        <form onSubmit={handleSubmit(handleCreateDivision)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
              handleCloseModal();
            }}>
            <Modal.Title>{editData ? 'Update' : 'Create'} District</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    District Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('name', {
                      required: 'District Name is required',
                    })}
                    type="text"
                    className={`form-control ${errors.name && 'is-invalid'}`}
                    placeholder="District Name"
                  />
                  <small className="text-danger">{errors.name?.message}</small>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Division Name <span className="text-danger">*</span>
                </label>
                <Controller
                  name="divisionId"
                  control={control}
                  render={({ field: { name, onChange, ref, value } }) => (
                    <Select
                      ref={ref}
                      name={name}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      value={divisionOptions?.filter((option: IOption) => {
                        return value?.includes(option.value as string);
                      })}
                      options={divisionOptions}
                      onChange={(selectedOption: IOption | null) => {
                        const newValue = selectedOption?.value || '';
                        onChange(newValue);
                      }}
                    />
                  )}
                />
                <small className="text-danger">
                  {errors.divisionId?.message}
                </small>
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
