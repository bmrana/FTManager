import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { WebConnectServiceService } from '../../core/web-services/web-connect-service.service';
import { DorFormDataService } from './data/dor-form-data.service';

@Component({
  selector: 'app-dor',
  templateUrl: './dor.component.html',
  styleUrls: ['./dor.component.css']
})
export class DorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }


}
