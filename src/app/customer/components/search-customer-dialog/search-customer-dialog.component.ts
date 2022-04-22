import { Component,  Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StatesModel } from 'src/app/shared/models/models';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-search-customer-dialog',
  templateUrl: './search-customer-dialog.component.html',
  styleUrls: ['./search-customer-dialog.component.scss']
})
export class SearchCustomerDialogComponent  implements OnInit {

  searchForm = this.form.group({
    firstName: [],
    lastName: [],
    email: [],
    cpf: [],
    state: [],
  });

  listState: StatesModel [] = []; //  Lista de estados e seus codigos

  constructor(    
    private typeService: TypeService,
    private form: FormBuilder,
    private dialogRef: MatDialogRef<SearchCustomerDialogComponent>,
    @Inject (MAT_DIALOG_DATA) data: any)
  {
    //this.searchForm.reset;

    /*
    this.searchForm.patchValue(
      firstName:  data.firstName.value(),
      lastName: data.lastName.value(),
      email:  data.email.value(),
      cpf:  data.cpf.value(),
      state:  data.cpf.value() 
      );
      */
    
  };  

  ngOnInit(): void {  
    // Pegar lista atualizada de estados
    this.typeService.updateListState().subscribe({
      next: (response) =>{
       this.listState = response;
      }
    });
  }

    setSearchProfile() {
      this.dialogRef.close({ data: this.searchForm  }) ;

    }


}
