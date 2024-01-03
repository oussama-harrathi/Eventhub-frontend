import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'EventHub';
  constructor(private userService:UserService){}
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