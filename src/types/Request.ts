import { Request } from "express";
type UserInformation = {
  acc_no: string;
  loc_no: string;
};
export default interface MyRequest extends Request {
  user_information?: UserInformation;
}
