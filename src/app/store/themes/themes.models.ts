export interface Themes {
  id: string;
  title: string;
  text: string;
  img: string;
  cta: CTA;
  Loading: boolean;
  inPrenav: boolean;
  footerDarken: boolean;
  child?: Array<any>;
}

export interface CTA {
  label: string;
}
