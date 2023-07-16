import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreateZillaModalProps } from '../../interfaces/modals/createZilla.interface';

export interface ICreateZillaPayload {
  zillaName: string;
  divisionName: string;
}

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

  const handleCreateDivision: SubmitHandler<ICreateZillaPayload> = (data) => {
    console.log('division', data);
  };
  const divisionOptions = [
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
        show={showCreateZillaModal}
        onHide={() => setShowCreateZillaModal?.(false)}
        centered>
        <form onSubmit={handleSubmit(handleCreateDivision)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}>
            <Modal.Title>Create Zilla</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Zilla Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register('zillaName', {
                      required: 'Zilla Name is required',
                    })}
                    type="text"
                    className={`form-control ${
                      errors.zillaName && 'is-invalid'
                    }`}
                    placeholder="Zilla Name"
                  />
                  <small className="text-danger">
                    {errors.zillaName?.message}
                  </small>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Division Name <span className="text-danger">*</span>
                </label>
                <Controller
                  name="divisionName"
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
                  {errors.divisionName?.message}
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
