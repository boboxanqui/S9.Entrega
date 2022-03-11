import { Component, OnInit } from '@angular/core';

interface Top {
  user: string;
  game: string;
  time: string;
  points: number;
}

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.css']
})
export class TopsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    this.topsArr = JSON.parse(localStorage.getItem('tops')!);
    this.topsArr.sort( (a, b) => a.points < b.points ? 1 : -1)
    
  }


  topsArr: Top[] = [];



}
