export interface TimeLimit {
  info: {
    title: string;
    text: string;
  };
  list: Array<Location>;
}


export interface Location {
  id: string;
  country: string;
  text: string;
  time: string;
}
