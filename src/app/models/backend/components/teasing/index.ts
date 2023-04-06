export class Teasing {
  info: {
    icon?: string;
    title?: string;
    text?: Array<string>;
    videoId?: string;
    img?: string;
  };
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { icon: string; title: string; text: Array<string>; videoId: string;  img: string; }, options?: { darkenBg?: boolean }){
    this.info = info;
    this.options = { darkenBg: false, ...options };
  }
}
