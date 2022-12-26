export interface Client {
  info: {
    title: string;
  };
  list: Array<{
    name: string;
    img: string;
    url: string;
  }>;
}
