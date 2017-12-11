import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage = new BehaviorSubject<string>('An unknown error has occurred.');
  errorSub: Subscription;
  errorString: string;
  constructor() { }

  ngOnInit() {
    this.errorSub = this.errorMessage.subscribe(
      (message) => {
        this.errorString = message;
      }
    );
  }

}
