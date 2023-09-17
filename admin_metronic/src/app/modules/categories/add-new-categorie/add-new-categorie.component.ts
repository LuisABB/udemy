import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../_services/categories.service';

@Component({
  selector: 'app-add-new-categorie',
  templateUrl: './add-new-categorie.component.html',
  styleUrls: ['./add-new-categorie.component.scss']
})
export class AddNewCategorieComponent implements OnInit {
  @Output() CategorieC: EventEmitter<any> = new EventEmitter();

  isLoading$:any;
  name:any=null;
  imagen_file:any=null;
  imagen_previzualicacion:any=null;
  
  constructor(
    public _categorieService: CategoriesService,
    public modal:NgbActiveModal,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }

  processFile($event){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.imagen_previzualicacion = null;
      this.toaster.open(NoticyAlertComponent, {text: `danger-'Upps! Necesita ingresar un archivo de tipo imagen'`});
      return;
    }

    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualicacion = reader.result;
  }

  save(){
    console.log(this.name,this.imagen_file);
    if(!this.name || !this.imagen_file){
      this.toaster.open(NoticyAlertComponent, {text: `danger-'Upps! Necesita ingresar todos los campos'`});
      return;
    }
    let fromData = new FormData();
    fromData.append('title',this.name);
    fromData.append('portada',this.imagen_file);

    this._categorieService.createCategorie(fromData).subscribe((resp:any) => {
      console.log(resp);
      this.CategorieC.emit(resp);
      this.modal.close();
    })
  } 

}
