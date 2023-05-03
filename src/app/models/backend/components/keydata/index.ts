export class KeyData {
  info: {
    title: string;
    text: Array<string>;
    cta: string;
    img: string;
    link?: {
      type?: 'Anchor' | 'Link';
      label: string;
      url: string;
    }
  };
  logos?: Array<Logos>;
  list: Array<{
    value: number;
    unit?: string;
    label: string;
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string; text: Array<string>; cta: string; img: string; link: { label: string; url: string } }, list: Array<{ value: number; unit: string; label: string; }>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}

export interface Logos {
  img: string;
  url: string;
  name: string;
}

