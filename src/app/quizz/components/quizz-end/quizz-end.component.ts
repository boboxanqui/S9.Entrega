import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz-end',
  templateUrl: './quizz-end.component.html',
  styleUrls: ['./quizz-end.component.css']
})
export class QuizzEndComponent {

  constructor( 
    private router: Router
  ) { }

  @Input() time: number = 0;
  @Input() points: number = 0;

  retry(){
    const url = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then( () => {
      this.router.navigate([url])
    })
  }

  tops(){
    this.router.navigate(['/clasificaciones'])
  }

}
