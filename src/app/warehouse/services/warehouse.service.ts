import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) {}
  
  balancePaginated(pager: PageEvent,  gameName?: string){
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);      
    if (gameName!=null) params = params.append('gameName',gameName);  
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/balance`, { params });
  }

  entrancePaginated(pager: PageEvent,  gameName?: string){
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);       
    if (gameName!=null) params = params.append('gameName',gameName);  
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/entrance`, { params });
  }

  exitPaginated(pager: PageEvent,  gameName?: string){
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);    
    if (gameName!=null) params = params.append('gameName',gameName);     
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/exit`, { params });
  }

  
  getAllGamesList() {
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/gameList`).pipe(take(1));
  }


}
