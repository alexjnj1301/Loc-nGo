import { Component, inject } from '@angular/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  private translateService = inject(MultipleTransLoaderHttp);
  private translate = inject(TranslateService);

  public title = 'Loc\'Ngo'
  public selectedLanguage: string
  public isLoading: boolean

  constructor() {
    this.selectedLanguage = this.translateService.getLang() || 'fr'
    this.translateService.setLang(this.selectedLanguage)
    this.translate.use(this.selectedLanguage)
    this.isLoading = false
  }

  public setIsLoading(isLoading: boolean): void {
    if(this.isLoading != isLoading) this.isLoading = isLoading
  }
}
