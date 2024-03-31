import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomePageComponent } from './main/components/home-page/home-page.component'
import { ContactComponent } from './main/components/contact/contact.component'
import { ErrorPageComponent } from './main/components/error-page/error-page.component'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { NavBarComponent } from './main/components/nav-bar/nav-bar.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TitlePictureComponent } from './main/components/title-picture/title-picture.component'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { DatePipe } from '@angular/common'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MatExpansionModule } from '@angular/material/expansion'
export function createTranslateLoader(http: HttpClient, cookieService: CookieService) {
  return new MultipleTransLoaderHttp(http, cookieService);
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactComponent,
    ErrorPageComponent,
    NavBarComponent,
    TitlePictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CookieService,
    provideNativeDateAdapter(),
    DatePipe,
    provideAnimationsAsync(),
    {
      provide: MAT_DATE_LOCALE,
      deps: [CookieService],
      useFactory: (cookieService: CookieService) => cookieService.get('lang') || 'fr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
