import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';

import { ErrorDetails } from '../../../enums/errorsPages';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],
    standalone: false
})
export class ErrorPageComponent implements OnInit {
  public code: string = ''
  public message: string = ''
  public description: string = ''

  translateValues: any = {}

  constructor(
    private route: ActivatedRoute,
    private translateService: MultipleTransLoaderHttp
  ) {}

  ngOnInit() {
    const errorKey = this.route.snapshot.paramMap.get('errorKey');
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.codes_error_description
    })

    if (errorKey && this.isErrorKey(errorKey)) {
      this.code = ErrorDetails[errorKey].code;
      this.message = ErrorDetails[errorKey].message;
    } else {
      this.code = 'Unknown code';
      this.message = 'Unknown error';
    }
  }

  isErrorKey(key: any): key is keyof typeof ErrorDetails {
    return key in ErrorDetails;
  }
}
