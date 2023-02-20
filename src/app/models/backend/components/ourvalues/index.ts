export class OurValues {
  list: Array<{
    img: string;
    picto: string;
    title: string;
    text: string;
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(list: Array<{ img: string; picto: string; title: string; text: string }>, options?: { darkenBg?: boolean }) {
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
