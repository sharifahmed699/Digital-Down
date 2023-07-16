import { Dispatch, SetStateAction } from 'react';

export interface IUserStatusUpdateModalProps {
  showUserStatusUpdateModal: boolean;
  setShowUserStatusUpdateModal: Dispatch<SetStateAction<boolean>>;
}
