import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { logout, setToken } from '../store/authSlice';
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
  const [authLogin, { data, isLoading, isSuccess }] = useAuthLoginMutation();

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    authLogin(data);
  };
  if (isSuccess) {
    if (!isLoading && data) {
      const token = data.token;
      localStorage.setItem('token', token);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(
        setToken({
          token: storedToken,
        })
      );
    }
  }, [dispatch, data]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body cardbody-color p-lg-5">
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>{' '}
              <div className="mb-3">
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="Phone number"
                  className={`form-control ${
                    errors.mobileNumber && 'is-invalid'
                  }`}
                  {...register('mobileNumber', {
                    required: 'Phone Number is required',
                  })}
                />
                {errors.mobileNumber && (
                  <p className="text-danger">{errors.mobileNumber.message}</p>
                )}
              </div>{' '}
              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-dark px-5 mb-5 w-100"
                  disabled={isLoading}>
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm mx-3"
                      role="status"
                      aria-hidden="true"></span>
                  )}
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
