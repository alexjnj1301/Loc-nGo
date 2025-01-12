import { Component, Input, OnInit } from '@angular/core';
import { AllLieuResponse } from '../../../../models/LieuModels'
import { AuthenticationService } from '../../../services/authentication.service'
import { Router } from '@angular/router'
import { Constants } from '../../../Constants'

@Component({
  selector: 'app-lieu-card',
  templateUrl: './lieu-card.component.html',
  styleUrl: './lieu-card.component.scss'
})
export class LieuCardComponent implements OnInit {
  @Input() lieu!: AllLieuResponse
  public isImageLoaded: boolean = false

  constructor(public authService: AuthenticationService,
              private router: Router,
              public constants: Constants) { }

  public ngOnInit(): void {
    this.isImageLoaded = false
  }

  public onImageLoad(): void {
    this.isImageLoaded = true
  }

  public redirect(): void {
    this.router.navigate(['/lieu-details', this.lieu.id])
  }
}
