import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core'
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
import { MatDialog } from '@angular/material/dialog'
import { PicturesDialogComponent } from './pictures-dialog/pictures-dialog.component'
import { Attendee } from '../../../models/Attendee'
import { AuthenticationService } from '../../services/authentication.service'
import { BookRequest } from '../../../models/ContactInformations'
import { Features, featuresItem } from '../../../models/Features'
import { SidenavComponent } from '../sidenav/sidenav.component'

@Component({
    selector: 'app-lieu-details',
    templateUrl: './lieu-details.component.html',
    styleUrl: './lieu-details.component.scss',
    standalone: false
})
export class LieuDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('picker') public picker! : MatDatepickerToggle<Date>
  @ViewChild('pictures') picturesRef!: ElementRef
  @ViewChild('reservation') reservationRef!: ElementRef

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
  protected readonly featuresItem = featuresItem

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent,
              private httpCallsService: HttpCallsService,
              public constants: Constants,
              public authenticationService: AuthenticationService,
              public sideNavComponent: SidenavComponent) {
    this.bookForm = this.formBuilder.group({
      startDate: (new FormControl<Date | null>(null), Validators.required),
      endDate: (new FormControl<Date | null>(null), Validators.required),
      attendees: this.formBuilder.array([])
    })
    this.addAttendee()
    this.minDate = new Date()
    this.maxDate = moment(this.minDate).add(1, 'years').toDate()
  }

  public ngAfterViewInit(): void {
    const pictures = this.picturesRef?.nativeElement;
    const reservation = this.reservationRef?.nativeElement;

    if (pictures && reservation) {
      const observer = new ResizeObserver(() => {
        reservation.style.height = `${pictures.offsetHeight}px`;
      });

      observer.observe(pictures);
    }
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

    const request: BookRequest = {
      lieu: {id: parseInt(this.lieuId)},
      start_date: this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!,
      end_date: this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!,
      attendees: this.attendeesFormArray.value.map((firstname: string) => ({ firstname: firstname, name: '' }))
    }

    this.httpCallsService.postBookRequest(request).subscribe({
      next: (response) => {
        this.bookForm.reset()
        this.startDateReset = null
        this.sideNavComponent.getReservations()
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
    this.attendeesFormArray.push(this.formBuilder.control('', Validators.required))
  }

  public getFeatureName(featureId: string): Features | undefined {
    return this.featuresItem.find(el => el.id === featureId)
  }

  public calculateNumberOfDays(): number {
    if (this.startDate && this.endDate) {
      const start = moment(this.startDate)
      const end = moment(this.endDate)
      return end.diff(start, 'days')
    }
    return 0
  }

  public removeAttendee(i: number) {
    if (this.attendeesFormArray.length > 1) {
      this.attendeesFormArray.removeAt(i)
    } else {
      this.attendeesFormArray.setValue([''])
    }
  }
}


