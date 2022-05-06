import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import {
  DetailCartItensModel,
  GameOfferWrapper,
  MediaModel,
  PricesModel,
  TypeModelSingle,
  TypesModelDual,
} from 'src/app/shared/models/models';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent  {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,    
    private translateService: TranslateService,
    private shoppingCartService: ShoppingCartService,
    private storeService: StoreService,  
    private typeService: TypeService,
    private router: Router,
    private form: FormBuilder,
  ) { }

  // dados do jogo
  gameOfferWrappers!: GameOfferWrapper ;
  //current image
  currentMedia:string = '';
  isVideoCurrentMedia:boolean = false;
  disableMenu:boolean = false;

  // id
  gameId!: number;

  // Options
  listGenre: TypesModelDual[] = []; //  Lista de generos de jogos
  listPlatform: TypeModelSingle[] = []  //  Lista de plataformas


  // Monitor de carregamento
  processing: boolean = false;

  
  // Monitor de carregamento
  outOfStock: boolean = false;

  //  Game Info details
  optionsToBuy: DetailCartItensModel[] = [];

  // Preços
  prices: PricesModel[] = []  //  Lista de plataformas

  // Monitor do tipo de tela
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );
  
  // Iten order form
  itemForm = this.form.group({
    gameCover: [ ],
    gameName: [],
    idPrice:[null, Validators.required],
    idPlatform: [],
    quantity: [],
    unityPrice: [],
    subTotal: [],
  });



  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.gameId = params['id'];
      },
    });

    this.typeService.updateListGenre().subscribe({
      next: (response) =>{
        this.listGenre = response;        
      }
    });

    this.typeService.updateListPlatform().subscribe({
      next: (response) =>{
        this.listPlatform = response;        
      }
    });
    
    this.patchGame();
  }

  patchGame(){
    this.storeService.getGameProfile(this.gameId).subscribe({
      next: (response) =>{    
        this.gameOfferWrappers  = response ;
        this.currentMedia =response?.game.cover
        this.itemForm.patchValue({
          gameCover: response?.game.cover,
          gameName: response?.game.name,
        })
        if(response?.medias[0]!= null ) this.currentMedia = response?.medias[0].url;
        else  this.disableMenu = true;            
        if(response?.prices[0]!= null ) this.prices = response?.prices;   
        if(response?.prices[0]== null ) this.outOfStock = true;
        
      }
    });
  }
  

selectMedia(game: MediaModel){  
  this.isVideoCurrentMedia= game.isVideo;
  this.currentMedia= game.url;  
}


resolveEnumSingle (id: number, typeModel: TypeModelSingle [] ){
  return typeModel.find( x=>x.id == id)?.description;
}

  
resolveEnumDual(id: any, typeModel: TypesModelDual [] ){
  let translation : string|undefined = ''   
  let cl = this.translateService.currentLang;
  if(cl=="en")   translation = typeModel.find( x=>x.id == id)?.descriptionEn; 
  else   translation = typeModel.find( x=>x.id == id)?.descriptionPt;  
  
  if( translation == null) { 
    return 'error';    
  }
  return translation;
}



addToCart(){ 
  let unityPrice = this.prices.find( x=>x.idPrice ==  this.itemForm.value.idPrice)?.value as number;  
  let idPlatform = this.prices.find( x=>x.idPrice ==  this.itemForm.value.idPrice)?.idPlatform as number;  
  this.itemForm.patchValue({
    quantity: 1,
    idPlatform: idPlatform,
    unityPrice: unityPrice,
    subTotal: unityPrice,
  })

  this.shoppingCartService.addToCart(this.itemForm.value); 
  this.router.navigate(['./shopping_cart']);  
}
}
