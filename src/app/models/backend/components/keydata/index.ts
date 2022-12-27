export interface KeyData {
  info: {
    img: string;
    link: {
      label: string;
      url: string;
    }
  };
  list: Array<{
    value: number;
    label: string;
  }>;
}
