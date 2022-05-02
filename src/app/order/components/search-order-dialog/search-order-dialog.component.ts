import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypesModelDual } from 'src/app/shared/models/models';
import { TypeService } from 'src/app/shared/services/type.service';



@Component({
  selector: 'app-search-order-dialog',
  templateUrl: './search-order-dialog.component.html',
  styleUrls: ['./search-order-dialog.component.scss']
})
export class SearchOrderDialogComponent implements OnInit {

  constructor(    
    private typeService: TypeService,
    private form: FormBuilder,
    private dialogRef: MatDialogRef<SearchOrderDialogComponent>,

    @Inject (MAT_DIALOG_DATA) data: any){
      this.searchForm.patchValue({
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        email: data.value.email,
        cpf: data.value.cpf,
        state: data.value.state,  
      })
    }    


  searchForm = this.form.group({
    idCustomer: [],
    username: [],
    cpf: [],
  });

    // Options
  listStatusOrder: TypesModelDual [] = []; //  Lista de estados e seus codigos


  ngOnInit(): void {  
    // Pegar lista atualizada de estados
    this.typeService.updateStatusOrder().subscribe({
      next: (response) =>{
       this.listStatusOrder = response;
      }
    });
  }

  save() {
    this.dialogRef.close(this.searchForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
