export class KeyData {
  info: {
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

  constructor(info: { img: string; link: { label: string; url: string } }, list: Array<{ value: number; label: string }>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
