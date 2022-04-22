import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StatesModel, TypeModelSingle, TypesModelDual } from '../models/models';
@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private http: HttpClient) {  }

  public listGenre: TypesModelDual[] = [];
  public listPlatform: TypeModelSingle[] = [];
  public listState: StatesModel[] = [];
  public listStatusOrder : TypesModelDual[] = [];

  updateListGenre() {
    return this.http.get<any>(`${environment.apiUrl}/api/types/getGenre`).pipe(take(1));
  }

  updateListPlatform() {
    return this.http.get<any>(`${environment.apiUrl}/api/types/getPlatform`).pipe(take(1));
  }

  updateListState() {
    return this.http.get<any>(`${environment.apiUrl}/api/types/getState`).pipe(take(1));
  }

  updateStatusOrder() {
    return this.http.get<any>(`${environment.apiUrl}/api/types/getStatusOrder`).pipe(take(1));
  }

  fillTypesIfEmpty(){
    if(this.listGenre.length==0){
      this.updateListGenre().subscribe (typesList =>  {
        this.listGenre = typesList
      });
    }

    if(this.listPlatform.length==0){
      this.updateListPlatform().subscribe (typesList =>  {
        this.listPlatform = typesList
      });
    }

    if(this.listState.length==0){
      this.updateListState().subscribe (typesList =>  {
        this.listState = typesList
      });
    }

    if(this.listStatusOrder.length==0){
      this.updateStatusOrder().subscribe (typesList =>  {
        this.listStatusOrder = typesList
      });
    }
  }

}
