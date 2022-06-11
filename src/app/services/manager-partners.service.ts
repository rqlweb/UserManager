import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ManagerPartnersService {

  usersCollection: UserInterface[] = [];
  updateIndex: number = 0;
  updateForm: boolean = false;

  constructor() { }

  get usersList() {
    return this.usersCollection;
  }

  addUsers( data: UserInterface ){

    data.idSocio = this.idGenerator();
    this.usersCollection.push(data);
    //console.log(data);
  }

  deleteUser( index: number ){

      this.usersCollection.splice(index, 1);
  }

  updateUser( index: number, data: UserInterface ){
    this.usersCollection.splice(index, 1, data);
  }

  filterUser( index: number ):  UserInterface {
    return this.usersCollection[index];
  }

  idGenerator(): string{

    let id = `00${this.usersCollection.length+1}-${Math.floor(Math.random()*1000)}`;
    return id;
    
  }


}
