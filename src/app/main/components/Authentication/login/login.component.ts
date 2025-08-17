import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../../services/authentication.service'
import { AppComponent } from '../../../../app.component'
import { Constants } from '../../../Constants'
import { Router, RouterLink } from '@angular/router'
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../authentication.styles.scss',
  imports: [ReactiveFormsModule, NgClass, NgOptimizedImage, RouterLink],
  standalone: true
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private translateService = inject(MultipleTransLoaderHttp);
  private authenticationService = inject(AuthenticationService);
  private appComponent = inject(AppComponent);
  private constants = inject(Constants);
  private router = inject(Router);

  public loginForm: FormGroup
  translateValues: any = {}

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.login;
    });
  }

  public login(): void {
   this.appComponent.setIsLoading(true)
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.appComponent.setIsLoading(false)
        localStorage.setItem(this.constants.TOKEN_KEY, response.token)
        this.authenticationService.setCurrentUser()
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log('Error:', err)
        this.appComponent.setIsLoading(false)
      }
    })
  }
}
