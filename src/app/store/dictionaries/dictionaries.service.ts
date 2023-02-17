import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dictionaries } from "./dictionaries.models";

@Injectable()
export class DictionariesService {
  constructor(private http: HttpClient) {}

  getDictionaries(theme: string, lang:string): Observable<Dictionaries> {
    return this.http.get<Dictionaries>("assets/datas/"+ lang +"/db-home-"+ theme +".json");
  }
}
