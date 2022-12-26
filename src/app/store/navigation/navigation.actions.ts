import { Action } from "@ngrx/store";

export enum Types {
  NAV_OPEN = '[Navigation] Open',
  NAV_CLOSE = '[Navigation] Close',
  NAV_TOGGLE = '[Navigation] Toggle',
}

export class NavOpen implements Action {
  readonly type = Types.NAV_OPEN;
  constructor(){};
}

export class NavClose implements Action {
  readonly type = Types.NAV_CLOSE;
  constructor(){};
}

export class NavToggle implements Action {
  readonly type = Types.NAV_TOGGLE;
  constructor(){};
}

export type All = NavOpen | NavClose | NavToggle;
