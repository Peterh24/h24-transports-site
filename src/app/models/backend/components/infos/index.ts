export class Infos {
  info: {
    title: string;
    text: string;
    img: string;
  };
  options?: {
    darkenBg:boolean;
    imgTo: 'left'|'right';
  }

  constructor(info: { title: string; text: string; img: string }, options?: { darkenBg?: boolean, imgTo: 'left'|'right'}) {
    this.info = info;
    this.options = { darkenBg: false, imgTo: 'right', ...options };
  }
}
