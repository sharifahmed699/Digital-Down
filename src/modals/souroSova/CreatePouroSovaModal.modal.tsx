import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import { ICreatePouroSovaModalProps } from '../../interfaces/modals/createPouroSovainterface';
import { ICreateUpoZillaPayload } from '../../interfaces/upozilla/ICreateUpoZillaPayload.interface';
import { ICreatePouroSovaPayload } from '../../interfaces/pouroSova/ICreatePouroSovaPayload.interface';
import { useGetUpoZilaQuery } from '../../endpoints/upoZillaApiSlice';
import { useCreatePouroSovaMutation } from '../../endpoints/pouroSovaApiSlice';

export interface IOption {
  label: string;
  value: string;
}

export const CreatePouroSovaModal: FC<ICreatePouroSovaModalProps> = ({
  showCreatePouroSovaModal,
  setShowCreatePouroSovaModal,
}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm<ICreatePouroSovaPayload>();

  const { isLoading, data } = useGetUpoZilaQuery(undefined);
  const [createPouroSova, { isSuccess }] = useCreatePouroSovaMutation();
  const handleCreateDivision: SubmitHandler<ICreatePouroSovaPayload> = (
    data
  ) => {
    createPouroSova(data);
  };
  const upoZillaOptions = data?.map((item) => ({
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
    setShowCreatePouroSovaModal(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      <Modal
        backdrop="static"
        show={showCreatePouroSovaModal}
        onHide={() => setShowCreatePouroSovaModal?.(false)}
        centered>
        <form onSubmit={handleSubmit(handleCreateDivision)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}>
            <Modal.Title>Create Pouro Sova</Modal.Title>
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
                      filterOption={createFilter(reactSelectFilterConfig)}
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCreatePouroSovaModal?.(false);
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
