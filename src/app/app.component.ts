import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private readonly appInstanceId = 'appInstance';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en'); // Set default language to English
    translate.use('en'); // Use English translations
  }

  ngOnInit() {
    if (!localStorage.getItem(this.appInstanceId)) {
      localStorage.setItem(this.appInstanceId, 'true');
      window.addEventListener('beforeunload', this.clearLocalStorage);
      window.addEventListener('storage', this.onStorageEvent);
    }
  }

  ngOnDestroy() {
    this.clearLocalStorage();
  }

  private clearLocalStorage = () => {
    localStorage.removeItem(this.appInstanceId);
    window.removeEventListener('beforeunload', this.clearLocalStorage);
    window.removeEventListener('storage', this.onStorageEvent);
  };

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  private onStorageEvent = (event: StorageEvent) => {
    // Handler for storage event
    if (event.key === this.appInstanceId && !event.newValue) {
      window.removeEventListener('storage', this.onStorageEvent);
      // Additional logic if needed when other instances are closed
    }
  };
}
