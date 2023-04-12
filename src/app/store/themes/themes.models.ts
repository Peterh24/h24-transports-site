export interface Themes {
  id: string;
  title: string;
  text: string;
  img: string;
  cta: CTA;
  Loading: boolean;
  inPrenav: boolean;
  footerDarken: boolean;
  meta: Meta;
  child?: Array<any>;
}

export interface CTA {
  label: string;
}
export interface Meta {
  description: string;
  keywords: string;
}
