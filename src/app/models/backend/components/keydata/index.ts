export interface KeyData {
  info: {
    link: {
      label: string;
      url: string;
    }
  };
  list: Array<{
    value: string;
    label: string;
  }>;
}
