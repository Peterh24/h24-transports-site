export class InfosImg {
  info: {
    title: string;
    text: string;
  };
  list: Array<{
    img: string;
    caption: string;
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; text: string; }, list: Array<{ img: string; caption: string; }>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
