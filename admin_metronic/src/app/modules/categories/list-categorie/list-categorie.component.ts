import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewCategorieComponent } from '../add-new-categorie/add-new-categorie.component';
import { URL_BACKEND } from 'src/app/config/config';
import { EditNewCategorieComponent } from '../edit-new-categorie/edit-new-categorie.component';
import { DeleteNewCategorieComponent } from '../delete-new-categorie/delete-new-categorie.component';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {

  categories:any = [];
  search:any = "";
  isLoading$:any=null;
  URL_BACKEND:any = URL_BACKEND;
  constructor(
    public _serviceCategorie: CategoriesService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._serviceCategorie.isLoading$;
    this.allCategories();
  }

  openCreate(){
    const modalRef = this.modalService.open(AddNewCategorieComponent, {centered:true, size:'md'});
    modalRef.componentInstance.CategorieC.subscribe((categorie:any)=>{
      this.categories.unshift(categorie);
    })
  }

  allCategories(){
    this._serviceCategorie.allCategories(this.search).subscribe((resp:any)=>{
      this.categories = resp.categories;
    })
  }

  refresh(){
    this.search="";
    this.allCategories();
  }

  editCategorie(categorie){
    const modalRef = this.modalService.open(EditNewCategorieComponent, {centered:true, size:'md'});
    modalRef.componentInstance.categorie_selected = categorie;

    modalRef.componentInstance.CategorieE.subscribe((categorie:any)=>{
      let index = this.categories.findIndex(item => item._id == categorie._id);
      if(index != -1){
        this.categories[index] = categorie;
      }
    })
  }

  delete(categorie){
    const modalRef = this.modalService.open(DeleteNewCategorieComponent, {centered:true, size:'md'});
    modalRef.componentInstance.categorie_selected = categorie;

    modalRef.componentInstance.CategorieD.subscribe((resp:any)=>{
      let index = this.categories.findIndex(item => item._id == categorie._id);
      if(index != -1){
        this.categories.splice(index,1);
      }
    })
  }

}
