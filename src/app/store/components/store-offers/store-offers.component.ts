import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ScreenMonitorService } from 'src/app/shared/services/screen-monitor.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-offers',
  templateUrl: './store-offers.component.html',
  styleUrls: ['./store-offers.component.scss']
})
export class StoreOffersComponent implements OnInit {

  constructor(    
    private storeService: StoreService,
    private feedback: FeedbackService,    
    private typeService: TypeService,
    private translateService: TranslateService,
    private screenMonitorService: ScreenMonitorService,
    ) {  }
  

  
  totalLength!: number;
  pageSize = 10;
  page = 0;  
  highlightItem = 0; 
  showPreviusButton = false;
  showNextButton= true;


  filterControl = new FormControl('');
  asc = new FormControl(false);
  sortBy = new FormControl('');
  loadingPage:boolean = true;
  // Lista de jogos
  games: any[] = [];
  highlight: any [] = [];

  // Options
  listGenre: TypesModelDual[] = []; //  Lista de estados e seus codigos


  ngOnInit(): void {
      this.typeService.updateListGenre().subscribe({
        next: (response) =>{
          this.listGenre = response;        
        }
      });

      this.storeService.getHighlight()
                        .subscribe( response =>  {
                          this.highlight = response.content;                      
                      });      
    
    this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe( () => {
      this.loadingPage = true;
      this.storeService.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,   
      },
      {field: this.sortBy.value, asc: this.asc.value}, 
     ).subscribe(response => {
        this.games = response.content;
        this.loadingPage = false;
      });
    })

      this.pageChange({      
      pageIndex: this.page,
      pageSize: this.pageSize,
      length: this.totalLength,
    });
  }

  isDisplay(option: string){
    return this.screenMonitorService.isDisplay(option);  
  }



  pageChange(pageEvent: PageEvent) {
    this.loadingPage = true;
    this.storeService.findAllPaginated(pageEvent,{field: this.sortBy.value, asc: this.asc.value},this.filterControl.value)
      .subscribe({
        next: (response) => {   
          this.games = response.content;
          this.loadingPage = false;
          this.totalLength = response.totalElements;
          this.pageSize = response.size;
          this.page = pageEvent.pageIndex;
        },
        error: () => this.feedback.showMessage('general.cantLoad'),
      });
  }


  resolveEnumDual(id: number, typeModel: TypesModelDual [] ){
    let translation : string|undefined = ''   
    let cl = this.translateService.currentLang;
    if(cl=="en")   translation = typeModel.find( x=>x.id == id)?.descriptionEn; 
    else   translation = typeModel.find( x=>x.id == id)?.descriptionPt;  
    
    if( translation == null) { 
      return 'error';    
    }
    return translation;
  }

  nextHighlight(){
    if(this.highlightItem!=4) {
      this.highlightItem++;
      this.showNextButton=true;
    }
    if(this.highlightItem==4) this.showNextButton=false;     
    this.showPreviusButton=true;    
  }

  previusHighlight(){
    if(this.highlightItem!=0) {
      this.highlightItem--;
      this.showPreviusButton=true;
    }
      if(this.highlightItem==0) this.showPreviusButton=false;
      this.showNextButton=true;    
  }
  show0(){
    if(this.highlightItem==0) return true;
    else return false;
  }
  show1(){
    if(this.highlightItem==1) return true;
    else return false;
  }
  show2(){
    if(this.highlightItem==2) return true;
    else return false;
  }
  show3(){
    if(this.highlightItem==3) return true;
    else return false;
  }
  show4(){
    if(this.highlightItem==4) return true;
    else return false;
  }


}
