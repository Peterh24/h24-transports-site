export interface Client {
  info: {
    title: string;
    imgStyle: string;
  };
  list: Array<{
    name: string;
    img: string;
    url: string;
  }>;
}
