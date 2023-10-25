import { Component, OnInit } from '@angular/core';
import { UtilService } from "@services/utilService";
import { Constants } from '@utils/constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
  }
  goToRecipt() {
    this.utilService.navigate(Constants.URL.RECEIPTS);
  }
}
