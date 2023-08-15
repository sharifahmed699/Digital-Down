import { Dispatch, SetStateAction } from 'react';
import { IGetAllDistrict } from '../district/IGetAllDistrict.interface';

export interface ICreatePouroSovaModalProps {
  showCreatePouroSovaModal: boolean;
  setShowCreatePouroSovaModal: Dispatch<SetStateAction<boolean>>;
  editData: IGetAllDistrict | undefined;
  setEditData: React.Dispatch<
    React.SetStateAction<IGetAllDistrict | undefined>
  >;
}
