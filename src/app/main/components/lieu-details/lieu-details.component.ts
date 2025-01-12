import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from '../../../app.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { LieuDetailsResponse } from '../../../models/LieuModels'
import { Tile } from '../../../models/Tile'
import { Observable, tap, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Constants } from '../../Constants'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { MatDatepickerToggle } from '@angular/material/datepicker'
import * as moment from 'moment'
import { MatDialog, MatDialogContainer } from '@angular/material/dialog'
import { PicturesDialogComponent } from './pictures-dialog/pictures-dialog.component'
import { Attendee } from '../../../models/Attendee'
import { AuthenticationService } from '../../services/authentication.service'
import { BookRequest } from '../../../models/ContactInformations'
import { toNumbers } from '@angular/compiler-cli/src/version_helpers'

@Component({
    selector: 'app-lieu-details',
    templateUrl: './lieu-details.component.html',
    styleUrl: './lieu-details.component.scss',
    standalone: false
})
export class LieuDetailsComponent implements OnInit {
  @ViewChild('picker') public picker! : MatDatepickerToggle<Date>

  public lieuId: string = ''
  public tiles: Tile[] = []
  public lieuDetails: LieuDetailsResponse | null = null
  public bookForm: FormGroup
  public startDateReset: string | null = null
  public isImageLoaded: boolean = false
  public minDate: Date
  public maxDate: Date
  public dtf: string = 'dd-MM-yyyy'
  public dialog = inject(MatDialog)
  public attendeesList: Attendee[] = []

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent,
              private httpCallsService: HttpCallsService,
              public constants: Constants,
              public authenticationService: AuthenticationService) {
    this.bookForm = this.formBuilder.group({
      startDate: (new FormControl<Date | null>(null), Validators.required),
      endDate: (new FormControl<Date | null>(null), Validators.required),
      attendees: this.formBuilder.array([])
    })
    this.addAttendee()
    this.minDate = new Date()
    this.maxDate = moment(this.minDate).add(1, 'years').toDate()
  }

  public ngOnInit(): void {
    this.lieuId = this.route.snapshot.paramMap.get('id')!

    this.getLieuDetails().subscribe({
      next: (response: LieuDetailsResponse) => {
        this.lieuDetails = response;
        this.tiles = [
          { img: this.lieuDetails.favorite_picture, cols: 2, rows: 2, class: 'principal-picture', position: 0 },
          { img: this.lieuDetails.images?.at(0)?.imageUrl ? this.lieuDetails.images.at(0)?.imageUrl : '', cols: 2, rows: 1, class: 'top-right-picture', position: 1 },
          { img: this.lieuDetails.images?.at(1)?.imageUrl ? this.lieuDetails.images.at(1)?.imageUrl : '', cols: 1, rows: 1, class: 'bottom-right-left', position: 2 },
          { img: this.lieuDetails.images?.at(1)?.imageUrl ? this.lieuDetails.images.at(1)?.imageUrl : '', cols: 1, rows: 1, class: 'bottom-right-right', position: 0 }
        ];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails du lieu:', err);
      }
    })
    this.isImageLoaded = false
  }

  public get startDate(): string | null {
    return this.bookForm.get('startDate')?.value
  }

  public get endDate(): string | null {
    return this.bookForm.get('endDate')?.value
  }

  public get attendeesFormArray(): FormArray {
    return this.bookForm.get('attendees') as FormArray;
  }

  public getLieuDetails(): Observable<LieuDetailsResponse> {
    setTimeout(() =>this.appComponent.setIsLoading(true))
    return this.httpCallsService.getLieuById(this.lieuId).pipe(
      tap(() => setTimeout(() => this.appComponent.setIsLoading(false))),
      catchError((error) => {
        console.error('get lieu details error:', error)
        this.appComponent.isLoading = false
        return throwError(() => error)
      })
    );
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return
    }
    console.log('bookForm:', this.bookForm.value)

    const request: BookRequest = {
      lieu: {id: parseInt(this.lieuId)},
      start_date: this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!,
      end_date: this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!,
      attendees: this.attendeesFormArray.value.map((firstname: string) => ({ firstname: firstname, name: '' }))
    }

    this.httpCallsService.postBookRequest(request).subscribe({
      next: (response) => {
        console.log('Réservation réussie:', response);
        this.bookForm.reset()
        this.startDateReset = null
      },
      error: (error) => {
        console.error('Erreur lors de la réservation:', error);
      }
    })
  }

  public onImageLoad(): void {
    this.isImageLoaded = true
  }

  public onClose() {
    this.startDateReset = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')
  }

  public onStartDateChange() {
    this.maxDate = moment(this.startDate).add(7, 'days').toDate()
  }

  public onEndDateChange() {
    let start = this.datePipe.transform(this.startDate, this.dtf)
    let end = this.datePipe.transform(this.endDate, this.dtf)
    if (end === start) {
      this.bookForm.reset()
    }
  }

  public openDialog(tile: Tile) {
    const imageDialogData = {
      images: this.lieuDetails?.images,
      index: tile.position -1,
      url: tile.img || ''
    }

    if (!this.lieuDetails?.images || tile.position < 0 || tile.position >= this.lieuDetails.images.length) {
      return
    }

    console.log(`this.lieuDetails?.images.at(${tile.position})`, this.lieuDetails?.images.at(tile.position))
    if (!this.lieuDetails?.images.at(tile.position)?.imageUrl) {
      for (let i = 0; i < this.lieuDetails.images.length; i++) {
        if (this.lieuDetails.images.at(i)?.imageUrl) {
          imageDialogData.index = i
          break
        }
      }
    }

    this.dialog.open(PicturesDialogComponent, {
      data: imageDialogData
    })
  }

  public addAttendee(): void {
    console.log('addAttendee', this.attendeesList.length)
    // this.attendeesList.push({ name: '', firstname: '' })
    this.attendeesFormArray.push(this.formBuilder.control('', Validators.required))
  }
}


