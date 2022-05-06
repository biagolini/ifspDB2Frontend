import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';
import { OrderService } from '../../services/order.service';
import { SearchOrderDialogComponent } from '../search-order-dialog/search-order-dialog.component';


@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})
export class OrderPanelComponent implements OnInit {

  constructor(
    private typeService: TypeService,
    private orderService: OrderService,
    private feedback: FeedbackService,
    private dialog: MatDialog,
    private form: FormBuilder,
    private translateService: TranslateService,
  
  ) {}

  filterControl = new FormControl('');
  asc = new FormControl(false);
  sortBy = new FormControl('');

  // Options
  listStatusOrder: TypesModelDual [] = []; 

  searchForm = this.form.group({
    orderStatus: [],
    idOrder: [],
    idCustomer: [],
    username: [],
    firstName: [],
    lastName: [],
    email: [],
    cpf: [],
  });

  selectedStatus = new FormControl();

  totalLength!: number;
  pageSize = 10;
  page = 0;  


  orderDataTable = new MatTableDataSource();
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'dateTimeOrder', 'idTypeStatusOrder', 'trackingCode','totalValue', 'action'];
  loadingTable:boolean = true;


  searchOrder(){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; // Permite que ESC ou clicar fora da caixa feche o dialog
        dialogConfig.autoFocus = true; // True, meaning that the focus will be set automatically on the first form field of the dialog
        dialogConfig.width = "75%";
        dialogConfig.data = this.searchForm
        let dialogRef = this.dialog.open(SearchOrderDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {    
          this.loadingTable = false;  
            if(res){
              this.searchForm.patchValue(res); // atualiza o formulario de pesquisa
              this.orderService.findAllPaginated({
                pageIndex: this.page,
                pageSize: this.pageSize,
                length: this.totalLength,   
              },
              {field: this.sortBy.value, asc: this.asc.value}, 
              this.selectedStatus.value,
              this.filterControl.value,
              this.searchForm.value,
              ).subscribe(response => {
                this.orderDataTable.data = response.content;
                this.loadingTable = false;
              });
            }
        })
  }

  ngOnInit(): void {
    this.typeService.fillTypesIfEmpty();

    // Pegar lista de status
    this.typeService.updateStatusOrder().subscribe({
      next: (response) =>{
       this.listStatusOrder = response;
      }
    });

    // Filtro
    this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.loadingTable = true;
      this.orderService.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,
      },
      {field: this.sortBy.value, asc: this.asc.value},
       this.selectedStatus.value,
       query).subscribe(response => {
        this.orderDataTable.data = response.content;
        this.loadingTable = false;
      });
    })

    this.pageChange({
      pageIndex: this.page,
      pageSize: this.pageSize,
      length: this.totalLength,
    });
  }


  pageChange(pageEvent: PageEvent) {
    this.loadingTable = true;
    this.orderService
      .findAllPaginated(pageEvent,{field: this.sortBy.value, asc: this.asc.value},this.selectedStatus.value, this.filterControl.value)
      .subscribe({
        next: (response) => {
          this.orderDataTable.data = response.content;
          this.loadingTable = false;
          this.totalLength = response.totalElements;
          this.pageSize = response.size;
          this.page = pageEvent.pageIndex;
        },
        error: () => this.feedback.showMessage('general.cantLoad'),
      });
  }


  changeOrder(collumName: string) {
    if(collumName!=this.sortBy.value){
      this.sortBy.setValue(collumName);
    }    
    if(collumName==this.sortBy.value){
      this.asc.setValue(!this.asc.value);
    } 
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


  reviewOrderValue(order: any){
    let id = order?.id;
    this.orderService.reviewOrderValue(order, id).subscribe({
      next: () => {
        this.feedback.showMessage('order.reviewRequested').subscribe({
          next: () => {
            this.ngOnInit();
          },
        });
      },
    });
  }
  
  disableButton(order: any){    
    return order?.totalValue != null;
  }
}
