import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sin-se',
  templateUrl: './sin-se.component.html',
  styleUrls: ['./sin-se.component.css']
})
export class SinSeComponent implements OnInit {

  constructor() { }
  loading = false;
  ngOnInit(): void {
    this.loading = false;
  }

}
