import { FC, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.css';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" />
    </Fragment>
  );
};

export default App;
