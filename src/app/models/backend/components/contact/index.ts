export interface Contact {
  info: {
    title: string;
  },
  list: Array<{
    label: string;
    type: string;
    require: boolean;
  }>;
}

