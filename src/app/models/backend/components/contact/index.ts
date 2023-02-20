export interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  validators: JsonFormValidators;
}

export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

export class Contact {
  info: {
    title: string;
  };
  list: Array<Array<JsonFormControls>>;
  options?: {
    darkenBg:boolean;
  }

  constructor(info: { title: string }, list: Array<Array<JsonFormControls>>, options?: { darkenBg?: boolean }) {
    this.info = info;
    this.list = list;
    this.options = { darkenBg: false, ...options };
  }
}
