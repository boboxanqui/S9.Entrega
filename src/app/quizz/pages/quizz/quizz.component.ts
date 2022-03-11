import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, map, Subscription, tap } from 'rxjs';

import { HttpService } from '../../services/http.service';

import { Question } from '../../interfaces/quizz.interface';
import { Country } from '../../interfaces/api.interfaces';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit, OnDestroy {

  constructor(
    private httpService:HttpService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.index = 0;

    this.startTime = Date.now() + this.countdown*1000;

    // Initial countdown
    this.intervalCountdown = interval(1000).subscribe( (_) => {
      if ( this.countdown > 0 ) {
        this.countdown--
      } else {
        this.intervalCountdown.unsubscribe()
      }
    })

    // Quizz Timer
    setTimeout( () => {
        this.startQuizzTimer()
    }, this.countdown*1000 )
    

    this.activatedRoute.params.subscribe( ({id}) => {
      switch (id){
        case 'capitales': 
          this.getCountriesList(); 
          this.actualGame = 'capitales'
          break;

        default: console.error('Not matching param from URL');
      }
    })
  }

  ngOnDestroy(): void {
    this.intervalCountdown.unsubscribe();
    this.intervalQuizz.unsubscribe()
  }

  // Game parameters
  quizzLength: number = 10;
  countdown: number = 3;
  private _quizzTimer: number = 100;

  // Game variables
  questions: Question[] = [];
  index: number = 0
  points: number = 0;
  showAnswer: boolean = false;
  correctAnswer: boolean = false;
  actualGame: string = '';

  // Observables subscriptions
  intervalCountdown!: Subscription;
  intervalQuizz!: Subscription;

  // Game Time 
  startTime!: number;
  totalTime: any;

  // I18nPlural Parameter
  puntosPlural = {
    "=1":"1 punto",
    "other":"# puntos"
  }

  get quizzTimer(){
    return this._quizzTimer +'%';
  }

  startQuizzTimer(){
    this._quizzTimer = 100;
    this.intervalQuizz = interval(25).subscribe( (_) => {
      this._quizzTimer -= 0.25;
      if( this._quizzTimer === 0){
        this.onAnswer( false );
        
      }
    })
  }

  // Obtención preguntas CAPITALES
  getCountriesList() {
    const subscription = this.httpService.getCountriesList().pipe(
        tap( resp =>{
          resp.sort( (a, b) => Math.random() > 0.5 ? 1 : -1);
          })
      )
      .subscribe( resp => {
        let countries = resp.filter( country => country.capital ); 
               
        for (let i = 0; i < this.quizzLength ; i++ ){
          this.questions.push({
            question: `¿Cual es la capital de ${countries[i].translations.es}?` , 
            img: countries[i].flags.png ,
            answers: [
              {
                correct: true,
                option: countries[i].capital
              },
              {
                correct: false,
                option: countries[i*4+this.quizzLength+1].capital
              },
              {
                correct: false,
                option: countries[i*4+this.quizzLength+2].capital
              },
              {
                correct: false,
                option: countries[i*4+this.quizzLength+3].capital
              }
            ]
          })
        }
        this.sortRandomAnswers();
      })
  }

  sortRandomAnswers(){
    for( let i = 0; i < 5; i++){
      this.questions.forEach( question => {
        question.answers.sort( (a, b) => Math.random() > 0.5 ? 1 : -1)
      })
    }
  }

  onAnswer( answer: boolean ){
    this.intervalQuizz.unsubscribe()
    if( answer ){
      this.points++
    }

    this.correctAnswer = answer;
    this.showAnswer = true;

    setTimeout( () => {
      this.index++
      this.showAnswer = false;
      this.startQuizzTimer()
    }, 1000)

    if( this.index === this.quizzLength -1 ){
      this.finishQuizz()
    }

  }

  finishQuizz() {    
    this.totalTime = (Date.now() - this.startTime) / 1000 ;
    // console.log('Total time: ' + this.totalTime);

    const top = { 
      user: this.authService.user.name,
      game: this.actualGame,
      time: this.totalTime,
      points: this.points,
    }

    let topsArr = []

    if(localStorage.getItem('tops')){
      topsArr = JSON.parse(localStorage.getItem('tops')!) 
    }

    topsArr.push(top)

    localStorage.setItem( 'tops', JSON.stringify(topsArr))
  }




}
