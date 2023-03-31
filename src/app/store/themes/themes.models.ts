export interface Themes {
  id: string;
  title: string;
  text: string;
  img: string;
  cta: CTA;
  Loading: boolean
  child?: Array<any>;
}

export interface CTA {
  label: string;
}
