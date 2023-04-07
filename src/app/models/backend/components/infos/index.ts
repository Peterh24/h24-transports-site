export class Infos {
  info: {
    title: string;
    globalTitle?:string;
    text?: Array<string>;
    dropdown?: Array<Dropdown>;
    img: string;
  };
  options?: {
    darkenBg:boolean;
    imgTo: 'left'|'right';
  }



  constructor(info: { title: string; globalTitle:string; text: Array<string>; dropdown:Array<Dropdown>; img: string }, options?: { darkenBg?: boolean, imgTo: 'left'|'right'}) {
    this.info = info;
    this.options = { darkenBg: false, imgTo: 'right', ...options };
  }
}

export interface Dropdown {
  title: string;
  text: Array<string>;
  isVisible: boolean;
}
