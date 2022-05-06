import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { DetailCartItensModel } from '../models/models';
import { FeedbackService } from './feedback.service';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  constructor(
    private http: HttpClient,
    private feedback: FeedbackService
    ) {  }

  // public cart: DetailCartItensModel[] = [];

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
  

  addToCart(newItem: DetailCartItensModel) {  
    let newItemPriceId = newItem?.idPrice;
    let testConflict: boolean = this.cart.find( x=>x.idPrice == newItemPriceId) != null;
    if( testConflict) console.log("Repeted item");
    else this.cart = [...this.cart, newItem ];   
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
  }
    




  changeItemQuantity(id:number, n:number){
   /* if(id>=this.cart.length) console.log("Error in changeItemQuantity: out of bounds");
    else this.cart[id].quantity = n;
    */
  }


}

  /*
    addToCart(idPrice: number) {    

   // this.cart = [...this.cart, {idPrice:idPrice,uantity:1} ];   
  }
  
  submmitOrder() {
    return this.http.post<any>(`${environment.apiUrl}/api/order/`, this.cart);
  }
  
  getCart() {
    return this.cart;
  }

}

*/
