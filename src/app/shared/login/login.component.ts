import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private fb: FormBuilder,
    private shareService: SharedService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
      this.shareService.showLogin$.subscribe( resp => {
        if(resp){
          this.loginForm.reset()
        }  
      })
  }

  @ViewChild('closeModal') closeModal!: ElementRef

  emailPattern: string =  "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{1,}$";

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern( this.emailPattern ) ]],
    password: ['', Validators.required]
  })

  loginSub!: Subscription
  loginError: boolean = false;

  inputInvalid( input: string ){
    return this.loginForm.get(input)?.invalid && 
      this.loginForm.controls[input].touched
  }

  emailError(){
    return this.loginForm.controls['email'].errors?.['required'] 
      ? 'Introduce correo electronico' 
      : 'Formato incorrecto'
  }

  onSubmit(){  
    this.loginError = false;  
    if( this.loginForm.invalid ){
      this.loginForm.markAllAsTouched();
      return
    }
    const { email, password } = this.loginForm.value;

    this.loginSub = this.authService.login( email, password ).subscribe( resp => {
      if( resp === true ) {
        console.log('Usuario logeado');
        this.closeModal.nativeElement.click()
        this.loginSub.unsubscribe()
      } else {
        this.loginError = true;
        console.log(resp);
      }
    })    
  }


}

