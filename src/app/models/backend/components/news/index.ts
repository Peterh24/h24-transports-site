export interface News {
  info: {
    title: string;
  };
  list: Array<{
    title: string;
    text: string;
    img: string;
    date: string;
  }>;
}
