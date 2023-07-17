import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setToken } from '../store/authSlice';
import { useAuthLoginMutation } from '../endpoints/authApiSlice';

type FormData = {
  mobileNumber: string;
  password: string;
};

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [authLogin, { data, isLoading }] = useAuthLoginMutation();

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    authLogin(data);
  };
  useEffect(() => {
    if (!isLoading && data) {
      const token = data.token;
      const user = { id: data.id, name: 'John Doe' };
      dispatch(setToken({ token, user }));
    }
  }, [isLoading, data, dispatch]);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100 mx-auto">
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className={`form-control ${errors.mobileNumber && 'is-invalid'}`}
            {...register('mobileNumber', {
              required: 'Phone Number is required',
            })}
          />
          {errors.mobileNumber && (
            <p className="text-danger">{errors.mobileNumber.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
