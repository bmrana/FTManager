import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService) {
    // this.router.events.pairwise()
    //   .subscribe((event) => {
    //     console.log(event);
    //   });
  }

  ngOnInit() {
    // this.httpService.fetchAppUsers();
    // this.router.navigate(['/']);
    this.authService.initAuth();
  }

  onLogin() {
    this.authService.login();
  }
}
