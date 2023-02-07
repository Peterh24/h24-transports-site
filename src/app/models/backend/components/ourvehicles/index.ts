export interface OurVehicles {
  info: {
    title: string;
  };
  list: Array<{
    title: string;
    illustration: string;
    description: Array<{
      label: string;
      value: string;
    }>
  }>;
}
