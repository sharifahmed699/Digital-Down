import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreateUpoZillaModalProps } from '../../interfaces/modals/createUpoZilla.interface';
import { useGetDistrictQuery } from '../../endpoints/districtApiSlice';
import { useCreateUpoZilaMutation } from '../../endpoints/upoZillaApiSlice';
import { ICreateUpoZillaPayload } from '../../interfaces/upozilla/ICreateUpoZillaPayload.interface';

export interface IOption {
  label: string;
  value: string;
}

export const CreateUpoZillaModal: FC<ICreateUpoZillaModalProps> = ({
  showCreateUpoZillaModal,
  setShowCreateUpoZillaModal,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<ICreateUpoZillaPayload>();

  const { isLoading, data } = useGetDistrictQuery(undefined);
  const [createUpoZila, { isSuccess }] = useCreateUpoZilaMutation();
  const handleCreateDivision: SubmitHandler<ICreateUpoZillaPayload> = (
    data
  ) => {
    createUpoZila(data);
  };

  const zillaOptions = data?.map((item) => ({
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
    setShowCreateUpoZillaModal(false);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
                      filterOption={createFilter(reactSelectFilterConfig)}
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCreateUpoZillaModal?.(false);
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
