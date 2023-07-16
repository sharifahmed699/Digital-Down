import { Dispatch, SetStateAction } from 'react';

export interface ICreateDivisionModalProps {
  showCreateDivisionModal: boolean;
  setShowCreateDivisionModal: Dispatch<SetStateAction<boolean>>;
}
