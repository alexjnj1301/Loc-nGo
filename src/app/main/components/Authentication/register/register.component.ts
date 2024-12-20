import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../authentication.styles.scss'
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public translateValues: any = {};
  public selectedTab: number = 0;

  constructor(private formBuilder: FormBuilder,
              private translateService: MultipleTransLoaderHttp) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        phone: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.register;
    });
  }

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
    }
    return null;
  };

  public register(): void {
    console.log(this.registerForm.value)
  }

  public isFirstPartValid(): boolean {
    return <boolean>this.registerForm.get('firstname')?.valid &&
      <boolean>this.registerForm.get('lastname')?.valid
  }

  public isSecondPartValid(): boolean {
    return <boolean>this.registerForm.get('email')?.valid &&
      <boolean>this.registerForm.get('phone')?.valid &&
      this.isFirstPartValid()
  }

  public previous(): void {
    this.selectedTab--
  }

  public next(): void {
    this.selectedTab++
  }

  public setCurrentIndex($event: number) {
    this.selectedTab = $event
  }

  public isFirstIndex(): boolean {
    return this.selectedTab === 0
  }

  public isLastIndex(): boolean {
    return this.selectedTab === 2
  }

  public nextButtonDisabled(): boolean {
    if (this.isFirstIndex() && !this.isFirstPartValid()) return true
    else if (this.selectedTab === 1 && !this.isSecondPartValid()) return true
    else if (this.isLastIndex()) return true
    return false
  }

  public checkPassWordConditions(password: string): void {
    if (password.length < 8) {
      console.log('Password must contain at least 8 characters')
    }
  }
}
