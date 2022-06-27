import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { GameSummaryModel, TypeModelSingle, TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ScreenMonitorService } from 'src/app/shared/services/screen-monitor.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { WarehouseService } from '../../services/warehouse.service';



@Component({
  selector: 'app-warehouse-balance',
  templateUrl: './warehouse-balance.component.html',
  styleUrls: ['./warehouse-balance.component.scss']
})
export class WarehouseBalanceComponent implements OnInit { 

  constructor(
    private typeService: TypeService,
    private warehouseService: WarehouseService,
    private feedback: FeedbackService,
    private form: FormBuilder,
    private screenMonitorService: ScreenMonitorService,
  ) {
    this.filteredGames = this.gameCtrl.valueChanges.pipe(
      startWith(''),
      map(game => (game ? this._filterGames(game) : this.listAllGames.slice())),
    );
  }

  // Options
  listGamePlatform: TypeModelSingle [] = []; 
  listWarehouseMovement: TypesModelDual[] = [];
  listAllGames: GameSummaryModel[]=[]

  // Filtro
  gamesForm = new FormControl(''); 
  gameCtrl = new FormControl();
  filteredGames: Observable<GameSummaryModel[]>;

  //Pageble
  totalLength!: number;
  pageSize = 50;
  page = 0;
  // Table
  warehouseDataTable = new MatTableDataSource();

  loadingTable:boolean = true;

  choosedColumns = new FormControl( [ 'gameName','idPlatform', 'quantity']);

  optionsColumns: string[] = ['gameCover','gameName','idPlatform', 'quantity','lastUpdate'];


  
  ngOnInit(): void {    
    if(this.isDisplay("Web"))this.choosedColumns.setValue( ['gameCover','gameName','idPlatform', 'quantity','lastUpdate'])


    this.typeService.fillTypesIfEmpty();
    // Pegar lista atualizada de estados
    this.typeService.updateListWarehouseMovement().subscribe({
      next: (response) =>{
       this.listWarehouseMovement = response;
      }
    });

    this.typeService.updateListPlatform().subscribe({
      next: (response) =>{
        this.listGamePlatform = response;        
      }
    });
    this.warehouseService.getAllGamesList().subscribe({
      next: (response) =>{
        this.listAllGames = response;   
      }
    });    

  this.pageChange({
    pageIndex: this.page,
    pageSize: this.pageSize,
    length: this.totalLength,
  });

      // Filtro
      this.gamesForm.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
        this.loadingTable = true;
        this.warehouseService.balancePaginated(
          {pageIndex: this.page, pageSize: this.pageSize,length: this.totalLength},
           query)
           .subscribe(
             response => {
              this.warehouseDataTable.data = response.content;
              this.loadingTable = false;
              this.totalLength = response.totalElements;
              this.pageSize = response.size;
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
    this.loadingTable = true;
    this.warehouseService
      .balancePaginated(pageEvent, this.gamesForm.value)
      .subscribe({
        next: (response) => {
          this.warehouseDataTable.data = response.content;
          this.loadingTable = false;
          this.totalLength = response.totalElements;
          this.pageSize = response.size;
          this.page = pageEvent.pageIndex;
        },
        error: () => this.feedback.showMessage('general.cantLoad'),
      });      
  }

  resolveEnumSingle (id: number, typeModel: TypeModelSingle [] ){
    return typeModel.find( x=>x.id == id)?.description;
  }
      
  private _filterGames(value: string): GameSummaryModel[] {
    const filterValue = value.toLowerCase();
    this.gamesForm.setValue(filterValue );
      console.log(this.gamesForm.value);
    return this.listAllGames.filter(game => game.name.toLowerCase().includes(filterValue));
  }

}
