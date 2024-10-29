import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../authentication.styles.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup
  public translateValues: any = {}
  constructor(private formBuilder: FormBuilder,
              private translateService: MultipleTransLoaderHttp) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.register;
    });
  }
}
