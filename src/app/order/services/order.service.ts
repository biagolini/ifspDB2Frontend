import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    searchForm?: {
      orderStatus: number,
      idOrder: number,
      idCustomer: number,
      username: string,
      firstName: string,
      lastName: string,
      email: string,
      cpf: string }) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);

    if (query) params = params.append('query', query);
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc'); 
    if (selectedState!=null) params = params.append('state',selectedState);
    if (searchForm){
      if (searchForm.orderStatus !=null) params = params.append('orderStatus',searchForm.orderStatus);
      if (searchForm.idOrder !=null) params = params.append('idOrder',searchForm.idOrder);
      if (searchForm.idCustomer !=null) params = params.append('idCustomer',searchForm.idCustomer);
      if (searchForm.username !=null) params = params.append('username',searchForm.username);
      if (searchForm.firstName !=null) params = params.append('firstName',searchForm.firstName);
      if (searchForm.lastName !=null) params = params.append('lastName',searchForm.lastName);
      if (searchForm.email !=null) params = params.append('email',searchForm.email);
      if (searchForm.cpf !=null) params = params.append('cpf',searchForm.cpf);
    }    
    return this.http.get<any>(`${environment.apiUrl}/api/order`, { params });
  }

  getOrderProfileById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/order/orderProfile/${id}`);
  }

}
