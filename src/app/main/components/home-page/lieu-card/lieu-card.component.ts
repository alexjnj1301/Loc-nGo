import { Component, Input } from '@angular/core';
import { AllLieuResponse } from '../../../../models/LieuModels'
import { AuthenticationService } from '../../../services/authentication.service'
import { Router } from '@angular/router'
import { Constants } from '../../../Constants'

@Component({
  selector: 'app-lieu-card',
  templateUrl: './lieu-card.component.html',
  styleUrl: './lieu-card.component.scss'
})
export class LieuCardComponent {
  @Input() lieu!: AllLieuResponse

  constructor(public authService: AuthenticationService,
              private router: Router,
              public constants: Constants) { }

  public redirect(): void {
    this.router.navigate(['/lieu-details', this.lieu.id])
  }
}
