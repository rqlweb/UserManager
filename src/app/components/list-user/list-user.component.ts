import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerPartnersService } from 'src/app/services/manager-partners.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users = this.services.usersList;
  seeList: boolean = false

  constructor( public services: ManagerPartnersService,
               private router:Router,
               private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if( this.users.length > 0){
      this.seeList = true;
    }else{
      this.seeList = false;
    }

  }

  onEdit(index : number){

    this.services.updateIndex = index;
    this.services.updateForm = true;
    this.router.navigateByUrl('/form-user');

  }

  onDelete(index : number){

      this.services.deleteUser(index);
      //console.log(this.services.usersList);

      if( this.services.usersList.length > 0){
        this.seeList = true;
      }else{
        this.seeList = false;
      }

      this._snackBar.open('Usuario Eliminado','Ok',{
        duration: 2000,});

  }

  closeList(){

    this.router.navigateByUrl('/home');
  }

}
