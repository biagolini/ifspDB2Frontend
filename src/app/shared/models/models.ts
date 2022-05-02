export interface TypeModelSingle {
  id: number;
  description: string;
}

export interface TypesModelDual {
  id: number;
  descriptionEn: string;
  descriptionPt: string;
}


export interface StatesModel {
  id: number;
  description: string;
  name: string;
}

export interface GameOfferWrapper {
  game: GameModel;
  medias: Array<MediaModel>;
  prices: Array<PriceModel>
}

export interface GameModel{
  id: number;
  name: string;
  releaseDate: string;
  genre: number;
  publisher: number;
  cover: string;
  bestPrice: number;
}

export interface MediaModel{
  id: number;
  game: number;
  isVideo: boolean;
  url: string;  
}

export interface PriceModel{
  id: number;
  gamePlatform: number;
  dateTimePublish: string;
  value: number;  
}