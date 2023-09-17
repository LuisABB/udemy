import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URL_BACKEND } from 'src/app/config/config';
import { AddNewSliderComponent } from '../add-new-slider/add-new-slider.component';
import { DeleteNewSliderComponent } from '../delete-new-slider/delete-new-slider.component';
import { EditNewSliderComponent } from '../edit-new-slider/edit-new-slider.component';
import { SliderService } from '../_services/slider.service';

@Component({
  selector: 'app-list-new-slider',
  templateUrl: './list-new-slider.component.html',
  styleUrls: ['./list-new-slider.component.scss']
})
export class ListNewSliderComponent implements OnInit {

  sliders:any = [];
  search:any = "";
  isLoading$:any=null;
  URL_BACKEND:any = URL_BACKEND;
  constructor(
    public _serviceSlider: SliderService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._serviceSlider.isLoading$;
    this.allSliders();
  }

  openCreate(){
    const modalRef = this.modalService.open(AddNewSliderComponent, {centered:true, size:'md'});
    modalRef.componentInstance.SliderC.subscribe((slider:any)=>{
      this.sliders.unshift(slider);
    })
  }

  allSliders(){
    this._serviceSlider.allSlider(this.search).subscribe((resp:any)=>{
      console.log(resp);
      this.sliders = resp.sliders;
    })
  }

  refresh(){
    this.search="";
    this.allSliders();
  }

  editSlider(slider){
    const modalRef = this.modalService.open(EditNewSliderComponent, {centered:true, size:'md'});
    modalRef.componentInstance.slider_selected = slider;

    modalRef.componentInstance.SliderE.subscribe((slider:any)=>{
      let index = this.sliders.findIndex(item => item._id == slider._id);
      if(index != -1){
        this.sliders[index] = slider;
      }
    })
  }

  delete(slider){
    const modalRef = this.modalService.open(DeleteNewSliderComponent, {centered:true, size:'md'});
    modalRef.componentInstance.slider_selected = slider;

    modalRef.componentInstance.SliderD.subscribe((resp:any)=>{
      let index = this.sliders.findIndex(item => item._id == slider._id);
      if(index != -1){
        this.sliders.splice(index,1);
      }
    })
  }
}
