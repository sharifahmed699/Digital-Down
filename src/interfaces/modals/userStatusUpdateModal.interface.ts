import { Dispatch, SetStateAction } from 'react';
import { IGetAllUser } from '../users/IGetAllUser.interface';

export interface IUserStatusUpdateModalProps {
  showUserStatusUpdateModal: boolean;
  setShowUserStatusUpdateModal: Dispatch<SetStateAction<boolean>>;
  editData: IGetAllUser | undefined;
  setEditData: React.Dispatch<React.SetStateAction<IGetAllUser | undefined>>;
}
