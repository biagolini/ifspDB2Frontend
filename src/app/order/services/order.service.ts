import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  findAllPaginated(
    pager: PageEvent,  
    sortBy: {field?: string,asc?: boolean}, 
    selectedState: boolean|number, 
    query?: string,
    searchForm?: {idCustomer: string, username: string, cpf: string}) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);

    if (query) params = params.append('query', query);
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc'); 
    if (selectedState!=null) params = params.append('state',selectedState);
    if (searchForm){
      if (searchForm.idCustomer !=null) params = params.append('idCustomer',searchForm.idCustomer);
      if (searchForm.username !=null)params = params.append('username',searchForm.username);
      if (searchForm.cpf !=null) params = params.append('cpf',searchForm.cpf);
    }
    return this.http.get<any>(`${environment.apiUrl}/api/order`, { params });
  }
}
