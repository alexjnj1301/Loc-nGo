import { Component } from '@angular/core';
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
