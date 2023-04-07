export class News {
  info: {
    title: string;
  };
  list: Array<{
    title: string;
    text: Array<string>;
    img: string;
    date: string;
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; }, list: Array<{ title: string; text: Array<string>; img: string; date: string }>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
