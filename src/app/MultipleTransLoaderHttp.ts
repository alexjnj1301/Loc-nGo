import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { forkJoin, Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class MultipleTransLoaderHttp implements TranslateLoader {
  private defaultLang: string = "fr"
  private currentLang: string = this.getLang()

  constructor(
    private http: HttpClient,
  ) {}

  getTranslation(): Observable<any> {
    this.currentLang = this.getLang()
    return forkJoin([
      this.http.get(`./assets/i18n/error_page/${this.currentLang}.json`),
      this.http.get(`./assets/i18n/navBar/${this.currentLang}.json`),
      this.http.get(`./assets/i18n/contact/${this.currentLang}.json`),
      this.http.get(`./assets/i18n/homePage/${this.currentLang}.json`),
      this.http.get(`./assets/i18n/authentication/login/${this.currentLang}.json`),
      this.http.get(`./assets/i18n/sidenav/${this.currentLang}.json`),
      this.http.get(`./assets/i18n/lieuDetails/${this.currentLang}.json`),
    ]).pipe(
      map((translations) => {
        return Object.assign({}, ...translations)
      })
    )
  }

  setLang(lang: string): void {
    localStorage.setItem('lang', lang)
  }

  getLang(): string {
    return localStorage.getItem('lang') || this.defaultLang
  }
}
