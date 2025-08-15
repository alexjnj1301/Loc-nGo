import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/main/services/auth.interceptor';
import { MAT_DATE_LOCALE, MatRipple, provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatTreeNodeToggle } from '@angular/material/tree';
import { MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { MultipleTransLoaderHttp } from './app/MultipleTransLoaderHttp'

export function createTranslateLoader() {
  return new MultipleTransLoaderHttp()
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, MatIconModule, MatButtonModule, MatToolbarModule, MatTooltipModule, MatMenuModule, MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, MatExpansionModule, MatProgressBarModule, MatTabsModule, MatDialogModule, MatProgressSpinnerModule, MatChipsModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }), NgOptimizedImage, MatTreeNodeToggle, MatRipple, MatStepperNext, MatStepperPrevious),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideNativeDateAdapter(),
        DatePipe,
        provideAnimationsAsync(),
        {
            provide: MAT_DATE_LOCALE,
            useFactory: () => localStorage.getItem('lang') || 'fr',
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));
