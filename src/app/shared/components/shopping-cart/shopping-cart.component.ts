import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { DetailCartItensModel, TypeModelSingle, TypesModelDual } from '../../models/models';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { TypeService } from '../../services/type.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private typeService: TypeService,
    private router: Router,
  ) {}

 
  // Options + carrinho
  listGenre: TypesModelDual[] = []; //  Lista de generos de jogos
  listPlatform: TypeModelSingle[] = []  //  Lista de plataformas

  cart = new MatTableDataSource();
  displayedColumns = ['gameCover','gameName','idPlatform','quantity','unityPrice','subTotal', 'removeIten'];

  totalOrderControl = new FormControl();

  ngOnInit(): void {
    this.cart.data = this.shoppingCartService.cart;  
    console.log(this.cart.data);
       this.calcTotalOrder();  

    this.typeService.updateListPlatform().subscribe({
      next: (response) =>{
        this.listPlatform = response;        
      }
    });  
 
  }

  resolveEnumSingle (id: number, typeModel: TypeModelSingle [] ){
    return typeModel.find( x=>x.id == id)?.description;
  }
  
  calcTotalOrder(){
    let currentCart = this.shoppingCartService.cart;
    let totalOrderValue = 0;
    currentCart.forEach(element => {    
      totalOrderValue = totalOrderValue+(element.quantity*element.unityPrice)})
    this.totalOrderControl.setValue(totalOrderValue);
  }


  increaseQuantity (item: DetailCartItensModel ){
    this.shoppingCartService.increaseQuantity(item);
    this.cart.data = this.shoppingCartService.cart;  
    this.calcTotalOrder();  
  }

  decreaseQuantity (item: DetailCartItensModel ){
    let testDelete:boolean=true;
    if(item.quantity==1) testDelete = confirm("Tem certeza que deseja remover o item do seu carrinho?")
    if(testDelete){
      this.shoppingCartService.decreaseQuantity(item);
      this.cart.data = this.shoppingCartService.cart;  
      this.calcTotalOrder();
    }  
  }

  dropItem (item: DetailCartItensModel ){
    let testDelete:boolean = confirm("Tem certeza que deseja remover o item do seu carrinho?")
    if(testDelete){
      this.shoppingCartService.decreaseQuantity(item);
      this.cart.data = this.shoppingCartService.cart;  
      this.calcTotalOrder();
    }  
  }



}
