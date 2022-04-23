import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { StatesModel } from 'src/app/shared/models/models';


import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';
import { CustomerService } from '../../services/customer.service';
import { SearchCustomerDialogComponent } from '../search-customer-dialog/search-customer-dialog.component';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss']
})
export class CustomerPanelComponent implements OnInit {

  constructor(
    private typeService: TypeService,
    private customerService: CustomerService,
    private feedback: FeedbackService,
    private  dialog: MatDialog,
    private form: FormBuilder,
  
  ) {}

  filterControl = new FormControl('');
  asc = new FormControl(false);
  sortBy = new FormControl('');
  // Options
  listState: StatesModel [] = []; //  Lista de estados e seus codigos


  searchForm = this.form.group({
    firstName: [],
    lastName: [],
    email: [],
    cpf: [],
    state: [],
  });


  selectedState = new FormControl();


  totalLength!: number;
  pageSize = 10;
  page = 0;  


  customerDataTable = new MatTableDataSource();
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'birthDate', 'cpf', 'street', 'city','state', 'action'];
  loadingTable:boolean = true;


  searchCustomer(){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; // Permite que ESC ou clicar fora da caixa feche o dialog
        dialogConfig.autoFocus = true; // True, meaning that the focus will be set automatically on the first form field of the dialog
        dialogConfig.width = "75%";
        dialogConfig.data = this.searchForm
        let dialogRef = this.dialog.open(SearchCustomerDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {    
          this.loadingTable = false;  
            if(res){
              this.searchForm.patchValue(res); // atualiza o formulario de pesquisa
              console.log(this.searchForm.value)
              this.customerService.findAllPaginated({
                pageIndex: this.page,
                pageSize: this.pageSize,
                length: this.totalLength,   
              },
              {field: this.sortBy.value, asc: this.asc.value}, 
              this.selectedState.value,
              this.filterControl.value,
              this.searchForm.value,
              ).subscribe(response => {
                this.customerDataTable.data = response.content;
                this.loadingTable = false;
              });
            }
        })
  }

  ngOnInit(): void {
    this.typeService.fillTypesIfEmpty();

    // Pegar lista atualizada de estados
    this.typeService.updateListState().subscribe({
      next: (response) =>{
       this.listState = response;
      }
    });

    // Aplicação de filtro de estado    
    this.selectedState.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.loadingTable = true;
      this.customerService.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,   
      },
      {field: this.sortBy.value, asc: this.asc.value}, 
      this.selectedState.value,
      this.filterControl.value
      ).subscribe(response => {
        this.customerDataTable.data = response.content;
        this.loadingTable = false;
      });
    })
    

    // Ordenação
    this.sortBy.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.loadingTable = true;
      this.customerService.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,   
      },
      {field: this.sortBy.value, asc: this.asc.value}, 
      this.selectedState.value,
      this.filterControl.value).subscribe(response => {
        this.customerDataTable.data = response.content;
        this.loadingTable = false;
      });
    })
    
    // Direção da ordenação
    this.asc.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.loadingTable = true;
      this.customerService.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,   
      },
      {field: this.sortBy.value, asc: this.asc.value},
       this.selectedState.value,
       this.filterControl.value).subscribe(response => {
        this.customerDataTable.data = response.content;
        this.loadingTable = false;
      });
    })

    // Filtro
    this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe(query => {
      this.loadingTable = true;
      this.customerService.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,
      },
      {field: this.sortBy.value, asc: this.asc.value},
       this.selectedState.value,
       query).subscribe(response => {
        this.customerDataTable.data = response.content;
        this.loadingTable = false;
      });
    })
    this.pageChange({
      pageIndex: this.page,
      pageSize: this.pageSize,
      length: this.totalLength,
    });
  }

  deleteUser({ id, name }: any) {
    this.feedback.requestConfirm('user.deletionConfirm',{ name }, result => {
      if(result.confirm){
        this.customerService.deleteUser(id).subscribe({
          next: () => {
            this.feedback.showMessage('user.deleted').subscribe();
            this.pageChange({
              pageIndex: this.page,
              pageSize: this.pageSize,
              length: this.totalLength,
            });
          },
        });
      }
    });

  }

  pageChange(pageEvent: PageEvent) {
    this.loadingTable = true;
    this.customerService
      .findAllPaginated(pageEvent,{field: this.sortBy.value, asc: this.asc.value},this.selectedState.value, this.filterControl.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.customerDataTable.data = response.content;
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


  getStateNameById(id: number){
    return this.typeService.getStateNameById(id);
  }




}
