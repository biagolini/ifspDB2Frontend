import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DetailCartItensModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  constructor(
    private http: HttpClient
    ) {  }

   public cart: DetailCartItensModel[] = [];

   /* // FOR DEV TESTS

  public cart: DetailCartItensModel[] = [
    {
        "gameCover": "https://upload.wikimedia.org/wikipedia/en/a/a3/Spider-Man_Miles_Morales.jpeg",
        "gameName": "Spider-Man: Miles Morales",
        "idPrice": 88,
        "idPlatform": 3,
        "quantity": 1,
        "unityPrice": 489,
        "subTotal": 489
    },
    {
        "gameCover": "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
        "gameName": "The Last of Us Part II",
        "idPrice": 47,
        "idPlatform": 2,
        "quantity": 1,
        "unityPrice": 494.73,
        "subTotal": 494.73
    },
    {
        "gameCover": "https://upload.wikimedia.org/wikipedia/en/7/74/The_Legend_of_Zelda_Link%27s_Awakening_%282019_video_game%29.jpg",
        "gameName": "The Legend of Zelda: Link’s Awakening",
        "idPrice": 18,
        "idPlatform": 1,
        "quantity": 1,
        "unityPrice": 510.51,
        "subTotal": 510.51
    },
    {
      "gameCover": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
      "gameName": "Cyberpunk 2077",
      "idPrice": 78,
      "quantity": 1,
      "unityPrice": 431.84,
      "subTotal": 431.84,
      "idPlatform": 2
  }
]
*/

  cleanCart() {
    this.cart = [];
  }

  public nCartSize: number = 0 ;

  updateCartSize() {
    this.nCartSize = this.cart.length;
  }


  addToCart(newItem: DetailCartItensModel) {
    let newItemPriceId = newItem?.idPrice;
    let testConflict: boolean = this.cart.find( x=>x.idPrice == newItemPriceId) != null;
    if( testConflict) console.log("Repeted item");
    else this.cart = [...this.cart, newItem ];
    this.updateCartSize();
  }


  dropCartItem(dropItem: DetailCartItensModel) {
    let dropItemPriceId = dropItem?.idPrice;
    var itemId: number =0;
    this.cart.forEach(element => {
      if(element?.idPrice == dropItemPriceId) {
        this.cart.splice(itemId,1)
      }
      itemId++;
    })
    this.updateCartSize();
  }

  increaseQuantity (item: DetailCartItensModel ){
    let idPrice = item?.idPrice;
    let newQuantity = item.quantity+1;
    let newSubTotal =  newQuantity* item.unityPrice;
    var itemId: number =0;
    this.cart.forEach(element => {
      if(element?.idPrice == idPrice) {
        this.cart[itemId].quantity = newQuantity;
        this.cart[itemId].subTotal = newSubTotal;
      }
      itemId++;
    })
    this.updateCartSize();
  }

  decreaseQuantity (item: DetailCartItensModel ){
    let idPrice = item?.idPrice;
    let newQuantity = item.quantity-1;
    if(newQuantity==0) this.dropCartItem(item);
    let newSubTotal =  newQuantity* item.unityPrice;
    var itemId: number =0;
    this.cart.forEach(element => {
      if(element?.idPrice == idPrice) {
        this.cart[itemId].quantity = newQuantity;
        this.cart[itemId].subTotal = newSubTotal;
      }
      itemId++;
    })
    this.updateCartSize();
  }

  placeOrder(formData: Object) {
    this.updateCartSize();
    return this.http.post<any>(`${environment.apiUrl}/api/order/`, formData);
  }

}



