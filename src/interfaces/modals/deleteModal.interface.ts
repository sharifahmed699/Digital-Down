import { Dispatch, SetStateAction } from 'react';

export interface IDeleteModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}
