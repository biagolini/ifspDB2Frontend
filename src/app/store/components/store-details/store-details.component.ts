import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';
import { GameOfferWrapper, MediaModel, TypeModelSingle, TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent  {

  constructor(
    private storeService: StoreService,
    private feedback: FeedbackService,    
    private typeService: TypeService,
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,

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

  // Monitor do tipo de tela
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );
  
  
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
        if(response?.medias[0]!= null ) this.currentMedia = response?.medias[0].url;
        else  this.disableMenu = true;      
      }
    });
  }
  

  selectMedia(game: MediaModel){  
    this.isVideoCurrentMedia= game.isVideo;
    this.currentMedia= game.url;  
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


}
