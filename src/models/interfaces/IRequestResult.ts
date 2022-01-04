export default interface IRequestResult {
  code: number;
  message: string;
  payload?: object;
  isWarning?: boolean;
}
