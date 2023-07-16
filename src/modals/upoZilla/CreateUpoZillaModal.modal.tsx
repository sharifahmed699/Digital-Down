import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreateUpoZillaModalProps } from '../../interfaces/modals/createUpoZilla.interface';

export interface ICreateUpoZillaPayload {
  upoZillaName: string;
  zillaName: string;
}

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

  const handleCreateDivision: SubmitHandler<ICreateUpoZillaPayload> = (
    data
  ) => {
    console.log('division', data);
  };
  const zillaOptions = [
    { label: 'dhaka', value: 'dhaka' },
    { label: 'rajshahi', value: 'rajshahi' },
  ];
  const reactSelectFilterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    stringify: (option: IOption) => `${option.label}`,
    matchFrom: 'any' as const,
    trim: true,
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
                    {...register('upoZillaName', {
                      required: 'Upo Zilla Name is required',
                    })}
                    type="text"
                    className={`form-control ${
                      errors.upoZillaName && 'is-invalid'
                    }`}
                    placeholder="UpoZilla Name"
                  />
                  <small className="text-danger">
                    {errors.upoZillaName?.message}
                  </small>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Zilla Name <span className="text-danger">*</span>
                </label>
                <Controller
                  name="zillaName"
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
                  {errors.zillaName?.message}
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
