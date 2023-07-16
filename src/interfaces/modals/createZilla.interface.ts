import { Dispatch, SetStateAction } from 'react';

export interface ICreateZillaModalProps {
  showCreateZillaModal: boolean;
  setShowCreateZillaModal: Dispatch<SetStateAction<boolean>>;
}
