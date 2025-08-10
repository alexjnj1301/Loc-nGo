import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog'
import { HttpCallsService } from '../../../services/httpCalls.service'
import { LieuDetailsResponse } from '../../../../models/LieuModels'
import { TranslateModule } from '@ngx-translate/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgClass } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { MatStep, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper'
import { MatCheckbox } from '@angular/material/checkbox'
import { GetAllServices } from '../../../../models/Services'
import { Features, featuresItem } from '../../../../models/Features'
import { MatTooltip } from '@angular/material/tooltip'
import { AddingLieuConfirmationComponent } from './adding-lieu-confirmation/adding-lieu-confirmation.component'

@Component({
  selector: 'app-add-lieu-dialog',
  templateUrl: './add-lieu-dialog.component.html',
  styleUrl: './add-lieu-dialog.component.scss',
  imports: [
    MatDialogContent,
    MatDialogModule,
    TranslateModule,
    ReactiveFormsModule,
    NgClass,
    MatButton,
    MatStepper,
    MatStep,
    MatCheckbox,
    MatTooltip,
    MatStepperNext,
    MatStepperPrevious,
  ],
})
export class AddLieuDialogComponent implements OnInit {
  protected readonly String = String
  protected readonly featuresItem = featuresItem
  public lieu: LieuDetailsResponse | undefined
  public isAddModeOrIsUpdateMode: boolean = true
  public lieuForm: FormGroup
  public services: GetAllServices[] = []
  public selectedServices: number[] = []
  public isLinear: boolean = false

  public constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
                     private httpService: HttpCallsService,
                     private fb: FormBuilder,
                     public dialog: MatDialog) {
    if (data) {
      this.isAddModeOrIsUpdateMode = false
      this.httpService.getLieuById(data.id.toString()).subscribe({
        next: (response) => {
          this.lieu = response
          console.log('Lieu details fetched successfully:', this.lieu)
        },
        error: (error) => {
          console.error('Error fetching lieu details:', error)
        }
      })
    }
    this.lieuForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      favorite_picture: ['', Validators.required]
    })
  }

  public ngOnInit() {
    this.getAllServices()
  }

  public addLieu() {
    this.httpService.addLieu(this.lieuForm.value).subscribe({
      next: (response) => {
        console.log('Lieu added successfully:', response)
        this.lieu = response
      },
      error: (error) => {
        console.error('Error adding lieu:', error)
      }
    })
  }

  public updateLieu() {
    console.log('Updating lieu with form data:', this.lieuForm.value)
  }

  public getAllServices() {
    this.httpService.getAllServices().subscribe({
      next: (response: GetAllServices[]) => {
        console.log('All services fetched successfully:', response)
        this.services = response
      },
      error: (error) => {
        console.error('Error fetching all services:', error)
      }
    })
  }

  public getFeatureName(featureId: string): Features | undefined {
    return this.featuresItem.find(el => el.id === featureId)
  }

  public addServices() {
    this.httpService.addServicesToLieu(this.lieu?.id!, this.selectedServices).subscribe({
      next: (response) => {
        console.log('Services added successfully:', response)
      },
      error: (error) => {
        console.error('Error adding services:', error)
      }
    })
  }

  public manageService(id: number) {
    if (this.selectedServices.includes(id)) {
      this.selectedServices = this.selectedServices.filter(serviceId => serviceId !== id)
    } else {
      this.selectedServices.push(id)
    }
  }

  public hasToBeChecked(id: number): boolean {
    return false
  }

  public openConfirmDialog() {
    this.dialog.open(AddingLieuConfirmationComponent)
  }

  public onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement
    console.log('File selected:', input.files)
  }
}
