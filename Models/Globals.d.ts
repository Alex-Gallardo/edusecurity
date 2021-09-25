import { AlertProps } from './../components/app/lualert/utils/models';
type EmptyFunction = () => unknown;

interface Window {
  Alert: (props: AlertProps | string) => unknown;
  hideAlert: () => unknown;
}
