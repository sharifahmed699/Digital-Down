import { Dispatch, SetStateAction } from 'react';
import { IGetAllDistrict } from '../district/IGetAllDistrict.interface';

export interface IDeleteModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  handleDelete: (id: number) => void;
  deletedId: number | undefined;
  isDeleteLoading: boolean;
  setClearData: React.Dispatch<
    React.SetStateAction<IGetAllDistrict | undefined>
  >;
}
