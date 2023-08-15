import { Dispatch, SetStateAction } from 'react';
import { IGetAllDistrict } from '../district/IGetAllDistrict.interface';

export interface ICreateDivisionModalProps {
  showCreateDivisionModal: boolean;
  setShowCreateDivisionModal: Dispatch<SetStateAction<boolean>>;
  editData: IGetAllDistrict | undefined;
  setEditData: React.Dispatch<
    React.SetStateAction<IGetAllDistrict | undefined>
  >;
}
