import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  constructor(private http: HttpClient) {}

  findAllPaginated(
    pager: PageEvent,  
    sortBy: {field?: string, asc?: boolean}, 
    query?: string,
    ) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);
    if (query) params = params.append('query', query);
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc'); 
    return this.http.get<any>(`${environment.apiUrl}/api/game`, { params });
  }

  getGameProfile(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/price/profile/${id}`);
  }

}