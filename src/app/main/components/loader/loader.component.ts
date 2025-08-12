import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner"
import { MatProgressBar } from "@angular/material/progress-bar"
import { MatCard } from "@angular/material/card"

@Component({
    selector: 'app-loader',
    imports: [
        MatCard
    ],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
