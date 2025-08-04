import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomePageComponent } from './main/components/home-page/home-page.component'
import { ErrorPageComponent } from './main/components/error-page/error-page.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { NavBarComponent } from './main/components/nav-bar/nav-bar.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MAT_DATE_LOCALE, MatRipple, provideNativeDateAdapter } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { DatePipe, NgOptimizedImage } from '@angular/common'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTabsModule } from '@angular/material/tabs'
import { AdminComponent } from './main/components/admin/admin.component'
import { DialogComponent } from './main/components/admin/dialog/dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatChipsModule } from '@angular/material/chips'
import {
  ValidDeletionDialogComponent,
} from './main/components/admin/valid-deletion-dialog/valid-deletion-dialog.component'
import { LoaderComponent } from "./main/components/loader/loader.component"
import { LoginComponent } from "./main/components/Authentication/login/login.component";
import { RegisterComponent } from './main/components/Authentication/register/register.component'
import { AuthInterceptor } from './main/services/auth.interceptor'
import { SidenavComponent } from './main/components/sidenav/sidenav.component'
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav'
import { ReservationCardComponent } from './main/components/sidenav/reservation-card/reservation-card.component'
import { MatDivider } from '@angular/material/divider'
import { LieuCardComponent } from './main/components/home-page/lieu-card/lieu-card.component'
import { LieuDetailsComponent } from './main/components/lieu-details/lieu-details.component'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { MatTreeNodeToggle } from '@angular/material/tree'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { TitlePictureComponent } from './main/components/title-picture/title-picture.component'

export function createTranslateLoader(http: HttpClient) {
  return new MultipleTransLoaderHttp(http)
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ErrorPageComponent,
    NavBarComponent,
    AdminComponent,
    DialogComponent,
    ValidDeletionDialogComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    ReservationCardComponent,
    LieuCardComponent,
    LieuDetailsComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
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
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LoaderComponent, NgOptimizedImage, MatDrawerContainer, MatDrawer, MatDivider, MatGridList, MatGridTile, MatTreeNodeToggle, MatRipple, FaIconComponent, TitlePictureComponent],
  exports: [],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideNativeDateAdapter(),
    DatePipe,
    provideAnimationsAsync(),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => localStorage.getItem('lang') || 'fr',
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
