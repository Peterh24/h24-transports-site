import { Component } from "../data";
import { Loader } from "../loader";

export interface Home {
  id: string;
  title: string;
  loader: Loader;
  componentsList: Array<Component>;
}
