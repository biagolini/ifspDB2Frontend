import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) {}

  
  balancePaginated(pager: PageEvent, sortBy: {field?: string,asc?: boolean},  gamePlatform?: number){
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);    
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc');   
    if (gamePlatform!=null) params = params.append('gamePlatform',gamePlatform);  
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/balance`, { params });
  }

  entrancePaginated(pager: PageEvent, sortBy: {field?: string,asc?: boolean},  gamePlatform?: number){
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);    
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc');     
    if (gamePlatform!=null) params = params.append('gamePlatform',gamePlatform);  
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/entrance`, { params });
  }


  exitPaginated(pager: PageEvent, sortBy: {field?: string,asc?: boolean},  gamePlatform?: number){
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);    
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc');  
    if (gamePlatform!=null) params = params.append('gamePlatform',gamePlatform);     
    return this.http.get<any>(`${environment.apiUrl}/api/warehouse/exit`, { params });
  }




}
