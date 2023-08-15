import { Dispatch, SetStateAction } from 'react';
import { IGetAllDistrict } from '../district/IGetAllDistrict.interface';

export interface ICreateUpoZillaModalProps {
  showCreateUpoZillaModal: boolean;
  setShowCreateUpoZillaModal: Dispatch<SetStateAction<boolean>>;
  editUpoZillaData: IGetAllDistrict | undefined;
  setEditUpoZillaData: React.Dispatch<
    React.SetStateAction<IGetAllDistrict | undefined>
  >;
}
