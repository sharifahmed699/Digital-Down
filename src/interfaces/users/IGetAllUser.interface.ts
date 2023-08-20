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
  isRegistered: string;
  flats: IFlat[];
}

export interface IFlat {
  id: number;
  houseName?: any;
  address: string;
  flatSide: string;
  floor?: any;
  flatType: string;
  sqr: string;
  bed: string;
  drawing: string;
  dining: string;
  washroom: string;
  kitchen: string;
  baranda: string;
  lift?: any;
  parking: string;
  guard: string;
  gas: string;
  rent: number;
  currentMeter: string;
  userId: number;
  requestUser: IRequestUser[];
  approvedUser?: any;
  flatImage?: any;
}

export interface IRequestUser {
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
  isRegistered: string;
  flats: any[];
}
