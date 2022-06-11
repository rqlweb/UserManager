import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerPartnersService } from 'src/app/services/manager-partners.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  seeUpdate: boolean = false;
  indexUser: number = 0;
  idSocio: string | undefined = '';

  user: UserInterface = {
    nombre: '',
    apellidos: '',
    idSocio: '',
    dni: '',
    telefono: '',
    sexo: ''
  }

  public userForm: FormGroup = this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(3), Validators.pattern('^([a-zA-Z]+[\\s])*([a-zA-Z])*$')]],
    apellidos:['',[Validators.required, Validators.minLength(3), Validators.pattern('^([a-zA-Z]+[\\s])*([a-zA-Z])*$')]],
    dni:['',[Validators.required, Validators.pattern('^[0-9]{8}[-]?[A-Za-z]$')]],
    telefono:['',[Validators.required, Validators.minLength(9), Validators.pattern('(6|9)[0-9]{8}')]],
    sexo:['',[Validators.required]]
  }); 
  
  constructor( private fb: FormBuilder,
               private services: ManagerPartnersService,
               private router:Router,
               private _snackBar: MatSnackBar,
              ) { }

               

  ngOnInit(): void {
    
    this.seeUpdate = this.services.updateForm;
    this.indexUser = this.services.updateIndex;
    if( this.seeUpdate ){
      let user = this.services.filterUser( this.indexUser );
      this.idSocio = user.idSocio;
      this.userForm.patchValue({ nombre: user.nombre, apellidos: user.apellidos, dni: user.dni, telefono: user.telefono, sexo: user.sexo });
    }
  }

  campoNovalido( campo: string ) {
    return this.userForm.controls[campo].errors && this.userForm.controls[campo].touched;
  }

  addPartners(){

    if( this.userForm.valid ){

      const{ nombre, apellidos, dni, telefono, sexo } = this.userForm.value;
      this.user.nombre = nombre;
      this.user.apellidos = apellidos;
      this.user.dni = dni;
      this.user.telefono = telefono;
      this.user.sexo = sexo;

      //console.log(this.user);

      this.services.addUsers( this.user );

      this.userForm.reset();

      setTimeout(() => {
        this._snackBar.open('Usuario Agregado Correctamente','Ok',{
          duration: 2000,});  
      },300);

      this.router.navigateByUrl('/home');

    }else{
      
      this.userForm.markAllAsTouched();
      return;
    }

  }

  updatePartners(){

    if( this.userForm.valid ){

      const{ nombre, apellidos, dni, telefono, sexo } = this.userForm.value;
      this.user.nombre = nombre;
      this.user.apellidos = apellidos;
      this.user.dni = dni;
      this.user.telefono = telefono;
      this.user.sexo = sexo;
      this.user.idSocio = this.idSocio;
      //console.log(this.user);

      this.services.updateUser( this.indexUser, this.user );

      this.services.updateForm = false;

      this.userForm.reset();

      setTimeout(() => {
        this._snackBar.open('Usuario Actualizado Correctamente','Ok',{
          duration: 2000,});  
      },300);

      this.router.navigateByUrl('/home');

    }else{
      
      this.userForm.markAllAsTouched();
      this._snackBar.open('Campos Invalidos','Ok',{
        duration: 1000,}); 
      return;
    }

  }

  cancel(){

    this.router.navigateByUrl('/home');

  }


}
