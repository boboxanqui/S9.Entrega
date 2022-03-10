import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor( 
    private fb: FormBuilder,
    private shareService: SharedService
    ) { }

  ngOnInit(): void {
      this.shareService.showSignup$.subscribe( resp => {
        if(resp){
          this.signupForm.reset()
        }  
      })
  }

  emailPattern: string =  "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{1,}$";
  passwordPattern: string = "([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)";


  signupForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern( this.emailPattern ) ]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]],
    terms: [false, Validators.requiredTrue]
  })

  inputInvalid( input: string ){
    return this.signupForm.get(input)?.invalid && 
      this.signupForm.controls[input].touched
  }


  // Error messages
  emailError(){
    return this.signupForm.controls['email'].errors?.['required'] 
      ? 'Introduce correo electronico' 
      : 'Formato incorrecto'
  }

  passwordError(){
    if(this.signupForm.controls['password'].errors?.['required']){
      return 'Introduce contraseña'
    } else if(this.signupForm.controls['password'].errors?.['minlength']){
      return 'Mínimo 6 caracteres'
    } else if(this.signupForm.controls['password'].errors?.['pattern']){
      return 'Debe contener letras y numeros'
    }
    return ''
  }


  // Submit
  onSubmit(){    
    if( this.signupForm.invalid ){
      this.signupForm.markAllAsTouched();
      return
    }

    console.log(this.signupForm.value);
    
  }


}
