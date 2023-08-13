export interface IResponse<T> {
  status: boolean;
  content: string;
  statusCode: string;
  data: T[];
}

export interface IGetAllDistrict {
  id: number;
  name: string;
}
