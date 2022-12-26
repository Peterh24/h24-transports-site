import { Component } from "@app/models/backend/data";


export interface Dictionaries {
  id: string;
  title: string;
  componentsList: Array<Component>;
}
