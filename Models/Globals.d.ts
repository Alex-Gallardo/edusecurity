type EmptyFunction = () => unknown;

interface Window {
  Alert: (props: AlertProps | string) => unknown;
  hideAlert: () => unknown;
}
