import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  data: any;
  pre = this.mainService.getData();

  constructor(private mainService: MainService) { }

  ngOnInit(): void {

  }

}
