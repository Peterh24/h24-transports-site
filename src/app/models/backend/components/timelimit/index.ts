export interface TimeLimit {
  info: {
    title: string;
    text: string;
  };
  list: Array<{
    country: string;
    text: string;
    time: string;
  }>;
}
