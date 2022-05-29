import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

import { DetailCartItensModel, TypeModelSingle, TypesModelDual } from '../../models/models';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { TypeService } from '../../services/type.service';
import { CartItensModel } from './../../models/models';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private typeService: TypeService,
    private form: FormBuilder,
    private router: Router,
    private feedback: FeedbackService,
    private authenticationService: AuthenticationService,
  ) {}


  // Options + carrinho
  listGenre: TypesModelDual[] = []; //  Lista de generos de jogos
  listPlatform: TypeModelSingle[] = []  //  Lista de plataformas

  cart = new MatTableDataSource();
  displayedColumns = ['gameCover','gameName','idPlatform','quantity','unityPrice','subTotal', 'removeIten'];

  totalOrderControl = new FormControl();

  submmitionForm = this.form.group({
    itens:  [],
  });

  ngOnInit(): void {
    this.cart.data = this.shoppingCartService.cart;
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
  placeOrder(){
    let submmitCart:CartItensModel[]=[];
    this.shoppingCartService.cart.forEach(element => {
      let item: CartItensModel = {"idPrice":element.idPrice , "quantity": element.quantity};
      submmitCart.push(item);
    });
    this.submmitionForm.value.itens = submmitCart;
    this.shoppingCartService.placeOrder(this.submmitionForm.value).subscribe({
      next: () => {
        this.feedback.showMessage('cart.success.created').subscribe();
        this.shoppingCartService.cleanCart();
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
        this.feedback.showMessage('cart.error.created').subscribe();
      }
    });
  }

  
  statusLogin():boolean {
    return this.authenticationService.statusLogin();
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
