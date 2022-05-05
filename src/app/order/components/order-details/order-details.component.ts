import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOrderModel, TypeModelSingle, TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { OrderService } from '../../services/order.service';



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  
  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private feedback: FeedbackService,
    private router: Router,
    private typeService: TypeService,
  ) {}

  isEdit = false;
  orderId!: number;
  processing: boolean = false;

  // Options
  listStatusOrder: TypesModelDual [] = []; 

  listPlatform: TypeModelSingle [] = []; 

  orderForm = this.form.group({
    id: [],
    idCustomer: [],
    firstName: [],
    lastName: [],
    email: [''],
    idTypeStatusOrder: [],
    dateTimeOrder: [],
    totalValue: [],
    trackingCode: [],
});

  // Itens table
  itensOrderDataTable = new MatTableDataSource<ItemOrderModel>();
  displayedColumns = [ 'quantity', 'gameName', 'typePlatformId','unityValue','subTotal'];


  ngOnInit(): void {
    this.typeService.fillTypesIfEmpty();
    // Pegar lista de status
    this.typeService.updateStatusOrder().subscribe({
      next: (response) =>{
       this.listStatusOrder = response;
      }
    });
    this.typeService.updateListPlatform().subscribe({
      next: (response) =>{
       this.listPlatform = response;
      }
    });


    this.route.params.subscribe({
      next: (params) => {
        this.orderId = params['id'];        
      },
    });
    this.patchOrder();
  }

  patchOrder(){
    this.orderService.getOrderProfileById(this.orderId).subscribe({
      next: (response) =>{
        this.orderForm.patchValue(response?.order);
        if(response?.order.trackingCode == null )  this.orderForm.patchValue({trackingCode: "--"})
        this.itensOrderDataTable.data = response?.itens;
        console.log( this.itensOrderDataTable.data);
      }
    });
  }

  
  resolveEnumSingle (id: number, typeModel: TypeModelSingle [] ){
    return  typeModel.find( x=>x.id == id)?.description;
  }


  reviewOrderValue(){
    this.orderService.reviewOrderValue(this.orderForm.value, this.orderId).subscribe({
      next: () => {
        this.feedback.showMessage('order.reviewRequested').subscribe({
          next: () => {
            this.ngOnInit();
          },
        });
      },
    });

  }

}


