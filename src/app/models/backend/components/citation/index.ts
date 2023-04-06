export class Citation {
  info: {
    text: string;
  };
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { text: string; }, options?: { darkenBg?: boolean }){
    this.info = info;
    this.options = { darkenBg: false, ...options };
  }
}
