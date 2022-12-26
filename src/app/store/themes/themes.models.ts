export interface Themes {
  id: string;
  title: string;
  text: string;
  img: string;
  cta: CTA;
  Loading: boolean
}

export interface CTA {
  label: string;
}
