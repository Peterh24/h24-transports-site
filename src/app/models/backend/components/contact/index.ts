export interface Contact {
  info: {
    title: string;
  },
  list: Array<JsonFormControls>;
}

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
