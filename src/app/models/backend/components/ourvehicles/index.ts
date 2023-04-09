export class OurVehicles {
  info: {
    title: string;
  };
  list: Array<{
    title: string;
    illustration?: string;
    video?: {
      mp4: string;
      ogv: string;
      webm: string;
      jpg: string;
    },
    description: Array<{
      label: string;
      value: string;
    }>
  }>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string }, list: Array<{ title: string; illustration: string; video: any; description: Array<{label: string; value: string}> }>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
