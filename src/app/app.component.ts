import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private readonly loginEvent = 'loginEvent';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en'); // Set default language to English
    translate.use('en'); // Use English translations
  }

  ngOnInit() {
    // Listen for login events in other tabs
    window.addEventListener('storage', this.onStorageEvent);
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.onStorageEvent);
  }

  // Method to handle login (this should be called when login is successful)
  handleLogin() {
    // Set item in localStorage to broadcast login event
    localStorage.setItem(this.loginEvent, new Date().toString());
  }

  // Method to handle logout (this should be called when logout is successful)
  handleLogout() {
    // Clear item in localStorage to broadcast logout event
    localStorage.removeItem(this.loginEvent);
  }

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  private onStorageEvent = (event: StorageEvent) => {
    if (event.key === this.loginEvent) {
      // React to login event, e.g., fetch user data, update UI
      this.updateOnLogin();
    }
  };

  private updateOnLogin() {
    // Implement logic to update the app state on login
    window.location.reload();
  }
}
