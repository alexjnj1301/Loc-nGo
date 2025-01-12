import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../../services/authentication.service'
import { AppComponent } from '../../../../app.component'
import { Constants } from '../../../Constants'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: '../authentication.styles.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  translateValues: any = {}

  constructor(private formBuilder: FormBuilder,
              private translateService: MultipleTransLoaderHttp,
              private authenticationService: AuthenticationService,
              private appComponent: AppComponent,
              private constants: Constants,
              private router: Router) {
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
