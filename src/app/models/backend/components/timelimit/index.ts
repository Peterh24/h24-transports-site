export interface Location {
  id: string;
  country: string;
  text: string;
  time: string;
}

export class TimeLimit {
  info: {
    title: string;
    text: string;
  };
  list: Array<Location>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; text: string; }, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = this.list;
    this.options = { darkenBg: false, ...options };
  }
}
