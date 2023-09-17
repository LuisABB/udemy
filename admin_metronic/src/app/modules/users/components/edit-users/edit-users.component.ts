import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  @Input() user_selected:any;

  @Output() UserE: EventEmitter<any> = new EventEmitter();
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
    this.name = this.user_selected.name;
    this.surname = this.user_selected.surname;
    this.email = this.user_selected.email;
  }

  save(){
    if(!this.name || !this.surname || !this.email){
      //Todos los campos son obligatorios
      this.toaster.open(NoticyAlertComponent, {text: `danger-'Upps! Necesita ingresar todos los campos.'`});
      return;
    }
    
    /*if(this.password != this.reget_password){
      //Todos los campos son obligatorios
      this.toaster.open(NoticyAlertComponent, {text: `danger-'Upps! Necesita ingresar contraseñas iguales.'`});
      return;
    }*/
    let data = {
      _id: this.user_selected._id,
      name:  this.name,
      surname:  this.surname,
      email:  this.email,
      password:  this.password,
      reget_password:  this.reget_password,
    }
    this.userService.updateUser(data).subscribe((resp:any)=>{
      console.log(resp);
      this.UserE.emit(resp.user);
      this.toaster.open(NoticyAlertComponent, {text: "success- El usuario se actualizo correctamente"});
      this.modal.close();
    }, (error) => {
      if(error.error){
        this.toaster.open(NoticyAlertComponent, {text: `danger-'${error.error.message}'`});
      }
    })
  }


}
