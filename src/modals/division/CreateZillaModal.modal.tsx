import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreateZillaModalProps } from '../../interfaces/modals/createZilla.interface';
import { useGetDivisionQuery } from '../../endpoints/divisionApiSlice';
import { useCreateDistrictMutation } from '../../endpoints/districtApiSlice';
import { ICreateZillaPayload } from '../../interfaces/district/ICreateDistrictPayload.interface';

export interface IOption {
  label: string;
  value: string;
}

export const CreateZillaModal: FC<ICreateZillaModalProps> = ({
  showCreateZillaModal,
  setShowCreateZillaModal,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<ICreateZillaPayload>();

  const [createDistrict, { isSuccess }] = useCreateDistrictMutation();
  const { isLoading, data } = useGetDivisionQuery(undefined);
  const handleCreateDivision: SubmitHandler<ICreateZillaPayload> = (data) => {
    createDistrict(data);
  };

  const divisionOptions = data?.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));
  const reactSelectFilterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    stringify: (option: IOption) => `${option.label}`,
    matchFrom: 'any' as const,
    trim: true,
  };
  if (isSuccess) {
    setShowCreateZillaModal(false);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
            }}>
            <Modal.Title>Create District</Modal.Title>
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
                      filterOption={createFilter(reactSelectFilterConfig)}
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
                setShowCreateZillaModal?.(false);
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
