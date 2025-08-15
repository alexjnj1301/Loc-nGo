import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { HttpCallsService } from '../../../services/httpCalls.service'
import { getImagesOfLieuResponse, LieuDetailsResponse } from '../../../../models/LieuModels'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { GetAllServices } from '../../../../models/Services'
import { Features, featuresItem } from '../../../../models/Features'
import { SetFavoriteImageDialogComponent } from './set-favorite-image-dialog/set-favorite-image-dialog.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatStep, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper'
import { NgClass } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { MatCheckbox } from '@angular/material/checkbox'
import { LoaderComponent } from '../../loader/loader.component'

@Component({
  selector: 'app-add-lieu-dialog',
  templateUrl: './add-lieu-dialog.component.html',
  styleUrl: './add-lieu-dialog.component.scss',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    TranslateModule,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    NgClass,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatStepperNext,
    MatCheckbox,
    MatStepperPrevious,
    LoaderComponent
  ],
  standalone: true,
})
export class AddLieuDialogComponent implements OnInit {
  data = inject<{
    id: number;
}>(MAT_DIALOG_DATA);
  private httpService = inject(HttpCallsService);
  private fb = inject(FormBuilder);
  dialog = inject(MatDialog);

  protected readonly String = String
  protected readonly featuresItem = featuresItem
  public lieu: LieuDetailsResponse | undefined
  public isAddModeOrIsUpdateMode = true
  public lieuForm: FormGroup
  public services: GetAllServices[] = []
  public selectedServices: number[] = []
  public file: File | null = null
  public isLoading = false
  public lieuImages: getImagesOfLieuResponse[] = []

  public constructor() {
    const data = this.data;

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
      price: [0, Validators.required]
    })
  }

  public ngOnInit() {
    this.getAllServices()
    // this.getImagesOfLieu()
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

  public getImagesOfLieu() {
    this.isLoading = true
    if (this.lieu) {
      this.httpService.getImagesOfLieu(this.lieu.id).subscribe({
        next: (response: getImagesOfLieuResponse[]) => {
          console.log('Images fetched successfully:', response)
          this.lieuImages = response
          this.isLoading = false
        },
        error: (error) => {
          console.error('Error fetching images:', error)
          this.isLoading = false
        }
      })
    }
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

  public hasToBeChecked(): boolean {
    return false
  }

  public openConfirmDialog() {
    this.isLoading = true
    this.httpService.addImageToLieu(this.file!, this.lieu?.id!).subscribe({
      next: (response) => {
        console.log('Image added successfully:', response)
        this.isLoading = false
        this.getImagesOfLieu()
        // reset the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
        // window.location.reload()
      },
      error: (error) => {
        console.error('Error adding image:', error)
        this.isLoading = false
        // window.location.reload()
      }
    })
  }

  public onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement
    this.file = input.files ? input.files[0] : null
  }

  public setFavoriteImage(imageUrl: string, imageId: number) {
    const imageData = {
      imageUrl: imageUrl,
      lieuId: this.lieu?.id,
      imageId: imageId
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = imageData

    this.dialog.open(SetFavoriteImageDialogComponent, dialogConfig)
  }
}
