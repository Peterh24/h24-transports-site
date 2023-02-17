import { Action } from "@ngrx/store";

export enum Types {
  LANGUAGE_CHANGE = '[Language] change Done!',
}

export class LanguageChange implements Action {
  readonly type = Types.LANGUAGE_CHANGE;
  constructor(public lang: string){};
}

export type All = LanguageChange;
