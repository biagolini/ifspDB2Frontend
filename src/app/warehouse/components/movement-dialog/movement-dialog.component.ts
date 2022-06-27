import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StatesModel, TypeModelSingle, TypesModelDual } from 'src/app/shared/models/models';
import { TypeService } from 'src/app/shared/services/type.service';


@Component({
  selector: 'app-movement-dialog',
  templateUrl: './movement-dialog.component.html',
  styleUrls: ['./movement-dialog.component.scss']
})
export class MovementDialogComponent implements OnInit {


  constructor(    
    private typeService: TypeService,
    private form: FormBuilder,
    private dialogRef: MatDialogRef<MovementDialogComponent>,
    @Inject (MAT_DIALOG_DATA) data: any){
      console.log(data);
      this.movementForm.patchValue({
        gamePlatform: data.gamePlatform,
        gameName: data.gameName,
        idPlatform: data.idPlatform,
      })
    }

    
  movementForm = this.form.group({
    gamePlatform: [],
    gameName: [{value: null, disabled: true}],
    idPlatform: [{value: null, disabled: true}],  
    movementType: [null,Validators.required], 
    idTypeWarehouseMovement: [null,Validators.required],  
    quantity: [null,Validators.required],  
  });



  isMovementTypeSelected:boolean= false;
  exitOnly:boolean= false;

  listGamePlatform: TypeModelSingle [] = []; 
  listWarehouseMovement: TypesModelDual[] = [];

  ngOnInit(): void {  
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

    this.movementForm.get('movementType')?.valueChanges
    .subscribe(value => {
      this.movementForm.patchValue({idTypeWarehouseMovement: null});
      if(value=='entry') {
        this.isMovementTypeSelected = true;
        this.exitOnly = false;
      } else if(value=='exit') {
        this.isMovementTypeSelected = true;
        this.exitOnly = true;
      } else {
        this.isMovementTypeSelected = false;
        this.exitOnly = false;
      }
    });


  }

  save() {
    this.dialogRef.close(this.movementForm.value);
  }

  close() {
    this.dialogRef.close();
  }


  resolveEnumSingle (id: number, typeModel: TypeModelSingle [] ){
    return typeModel.find( x=>x.id == id)?.description;
  }

  verForm(){
    console.log(this.movementForm.value);
  }


  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
