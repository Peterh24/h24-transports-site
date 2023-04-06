export class Client {
  info: {
    title: string;
    imgStyle: string;
    text: Array<string>
  };
  list: Array<{
    name: string;
    img: string;
    url: string;
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; imgStyle: string; text: Array<string> }, list: Array<{ name: string; img: string; url: string }>, options?: { darkenBg?: boolean }){
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
