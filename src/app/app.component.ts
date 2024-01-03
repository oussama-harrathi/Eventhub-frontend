import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'EventHub';
  constructor(private translate: TranslateService,private userService:UserService){
  translate.setDefaultLang('en'); // Set default language to English
    translate.use('en'); // Use English translations
  }
  ngOnInit() {
    window.addEventListener('storage', this.onStorageEvent);
  }
  
  ngOnDestroy() {
    window.removeEventListener('storage', this.onStorageEvent);
  }
  
  private onStorageEvent = (event: StorageEvent) => {
    if (event.key === 'isLoggedIn') {
      const isLoggedIn = event.newValue === 'true';
      this.userService.updateAuthenticationStatus(isLoggedIn);
    }
  };
}