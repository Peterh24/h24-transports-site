export class KeyData {
  info: {
    title: string;
    text: Array<string>;
    cta: string;
    img: string;
    link: {
      label: string;
      url: string;
    }
  };
  list: Array<{
    value: number;
    label: string;
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; text: Array<string>; cta: string; img: string; link: { label: string; url: string } }, list: Array<{ value: number; label: string }>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
