import { Action } from "@ngrx/store";

export enum Types {
  READ = '[Theme] Read: Start',
  READ_SUCCESS = '[Theme] Read: Success',
  READ_ERROR = '[Theme] Read: Error',
  ADD_CURRENT_THEME = '[Global] CURRENT_THEME: Add',
  LOADER_START = '[Loader] start',
  LOADER_STOP = '[Loader] stop',
}

export class Read implements Action {
  readonly type = Types.READ;
  constructor(){};
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;

  constructor(public themes: any){};
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;
  readonly themes = {};
  constructor(public error: string){};
}

export class AddCurrentTheme implements Action {
  readonly type = Types.ADD_CURRENT_THEME;
  constructor(public theme: string) {}
}

export class LoaderStart implements Action {
  readonly type = Types.LOADER_START;
  constructor() {}
}

export class LoaderStop implements Action {
  readonly type = Types.LOADER_STOP;
  constructor() {}
}

export type All = Read | ReadSuccess | ReadError | AddCurrentTheme | LoaderStart | LoaderStop;
