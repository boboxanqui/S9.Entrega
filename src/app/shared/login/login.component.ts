import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private fb: FormBuilder,
    private shareService: SharedService
    ) { }

  ngOnInit(): void {
      this.shareService.showLogin$.subscribe( resp => {
        if(resp){
          this.loginForm.reset()
        }  
      })
  }

  emailPattern: string =  "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{1,}$";

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern( this.emailPattern ) ]],
    password: ['', Validators.required]
  })

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
    if( this.loginForm.invalid ){
      this.loginForm.markAllAsTouched();
      return
    }

    console.log(this.loginForm.value);
    
  }


}
