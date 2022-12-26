export interface OurVehicles {
  info: {
    title: string;
    img: string;
  };
  list: Array<{
    title: string;
    descriptions: Array<{
      label: string;
      value: string;
    }>
  }>;
}
