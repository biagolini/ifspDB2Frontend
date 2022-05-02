import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, map, Observable, shareReplay } from 'rxjs';
import { TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
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
    private breakpointObserver: BreakpointObserver,
  ) { }
  
  totalLength!: number;
  pageSize = 100;
  page = 0;  

  filterControl = new FormControl('');
  asc = new FormControl(false);
  sortBy = new FormControl('');
  loadingPage:boolean = true;
  // Lista de jogos
  games: any[] = [];

  // Options
  listGenre: TypesModelDual[] = []; //  Lista de estados e seus codigos

  // Monitor do tipo de tela
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
      this.typeService.updateListGenre().subscribe({
        next: (response) =>{
          this.listGenre = response;        
        }
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



  pageChange(pageEvent: PageEvent) {
    this.loadingPage = true;
    this.storeService.findAllPaginated(pageEvent,{field: this.sortBy.value, asc: this.asc.value},this.filterControl.value)
      .subscribe({
        next: (response) => {
          this.games = response.content;
          //console.log(this.games);
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
    if(cl=="pt")  translation = typeModel.find( x=>x.id == id)?.descriptionPt;
    else  translation = typeModel.find( x=>x.id == id)?.descriptionEn;   
    
    if( translation == null) { 
      return 'error';    
    }
    return translation;
  }

}
