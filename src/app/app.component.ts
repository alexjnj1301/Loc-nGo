import { Component, inject } from '@angular/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { TranslateService } from '@ngx-translate/core'
import { LoaderComponent } from './main/components/loader/loader.component';
import { NavBarComponent } from './main/components/nav-bar/nav-bar.component';
import { SidenavComponent } from './main/components/sidenav/sidenav.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
  imports: [LoaderComponent, NavBarComponent, SidenavComponent],
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
