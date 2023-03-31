import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Themes } from "./themes.models";



@Injectable()
export class ThemesService {
  constructor(private http: HttpClient) {}

  getDictionaries(lang:string): Observable<Array<Themes>> {
    let url = "assets/datas/" + lang + "/db-themes.json";
    return this.http.get<Array<Themes>>(url);
  }
}
