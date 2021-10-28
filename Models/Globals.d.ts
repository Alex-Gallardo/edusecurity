import { AlertProps } from "./../components/app/lualert/utils/models";
type EmptyFunction = () => unknown;

declare global {
  interface Window {
    Alert: (props: AlertProps | string) => unknown;
    hideAlert: () => unknown;
  }
}
