import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Themes } from "./themes.models";

const url = "assets/datas/db-themes.json";

@Injectable()
export class ThemesService {
  constructor(private http: HttpClient) {}

  getDictionaries(): Observable<Array<Themes>> {
    return this.http.get<Array<Themes>>(url);
  }
}
