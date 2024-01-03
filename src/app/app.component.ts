import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service'; // Import UserService (adjust path as necessary)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;

  constructor(private translate: TranslateService, private userService: UserService) {
    translate.setDefaultLang('en'); // Set default language to English
    translate.use('en'); // Use English translations
  }

  ngOnInit() {
    // Listen for login events in other tabs
    window.addEventListener('storage', this.onStorageEvent);
    this.checkInitialLoginState();
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.onStorageEvent);
  }

  private onStorageEvent = (event: StorageEvent) => {
    if (event.key === 'isLoggedIn') {
      const isLoggedIn = event.newValue ? JSON.parse(event.newValue) : false;
      this.updateOnLogin(isLoggedIn);
    }
  };
  

  private checkInitialLoginState() {
    // Use a default value of 'false' if localStorage.getItem returns null
    const isLoggedInStr = localStorage.getItem('isLoggedIn') || 'false';
    const isLoggedIn = JSON.parse(isLoggedInStr);
    this.updateOnLogin(isLoggedIn);
  }
  

  private updateOnLogin(isLoggedIn: boolean) {
    // Update the application state based on the login status
    if (isLoggedIn) {
      // Logic for when the user is logged in
      console.log('User is logged in - updating UI and fetching data.');
      // Implement your logic here. For example, fetching user data.
    } else {
      // Logic for when the user is logged out
      console.log('User is logged out - updating UI.');
      // Implement logic to handle logged-out state.
    }
  }

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }
}
