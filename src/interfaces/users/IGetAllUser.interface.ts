export interface IGetAllUserResponse {
  status: boolean;
  content: string;
  statusCode: string;
  data: IGetAllUser[];
}

export interface IGetAllUser {
  id: number;
  userId: string;
  nid: string;
  name: string;
  fatherName: string;
  motherName: string;
  genderType: string;
  birthday: string;
  mobileNumber: string;
  email: string;
  profession: string;
  division: string;
  district: string;
  upozilla: string;
  pourosova: string;
  area: string;
  wordNo: string;
  postCode: string;
  holdingNumber: string;
  userType: string;
  verificationCode?: any;
  enabled: boolean;
  isRegistered: boolean;
  flats: any[];
}
