export class SimpleText {
  info: {
    title: string;
    text: Array<string>;
    cta?: string;
    url?: string;
  };
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; text: Array<string>; cta:string }, options?: { darkenBg?: boolean }){
    this.info = info;
    this.options = { darkenBg: false, ...options };
  }
}
