import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter();
  name:any = null;
  surname:any = null;
  email:any = null;
  password:any = null;
  reget_password:any = null;
  constructor(
    public modal: NgbActiveModal,
    public userService: UsersService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  save(){
    if(!this.name || !this.surname || !this.email || !this.password || !this.reget_password){
      //Todos los campos son obligatorios
      this.toaster.open(NoticyAlertComponent, {text: `danger-'Upps! Necesita ingresar todos los campos.'`});
      return;
    }
    
    if(this.password != this.reget_password){
      //Todos los campos son obligatorios
      this.toaster.open(NoticyAlertComponent, {text: `danger-'Upps! Necesita ingresar contraseñas iguales.'`});
      return;
    }
    let data = {
      name:  this.name,
      surname:  this.surname,
      email:  this.email,
      password:  this.password,
      reget_password:  this.reget_password,
    }
    this.userService.createUser(data).subscribe((resp:any)=>{
      console.log(resp);
      this.UserC.emit(resp.user);
      this.toaster.open(NoticyAlertComponent, {text: "success- El usuario se registro correctamente"});
      this.modal.close();
    }, (error) => {
      if(error.error){
        this.toaster.open(NoticyAlertComponent, {text: `danger-'${error.error.message}'`});
      }
    })
  }

}
