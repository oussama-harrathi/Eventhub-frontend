import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service'; // Adjust the path as needed

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.getLoaderState().subscribe(state => {
      this.isLoading = state;
    });
  }
}
