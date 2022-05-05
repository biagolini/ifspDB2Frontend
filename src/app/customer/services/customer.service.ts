import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  findAllPaginated(
    pager: PageEvent,  
    sortBy: {field?: string,asc?: boolean}, 
    selectedState: boolean|number, 
    query?: string,
    searchForm?: {firstName: string, lastName: string, email: string, cpf: string, state: number}) {
      
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);

    if (query) params = params.append('query', query);
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc'); 
    if (selectedState!=null) params = params.append('state',selectedState);
    if (searchForm){
      if (searchForm.firstName !=null) params = params.append('firstName',searchForm.firstName);
      if (searchForm.lastName !=null)params = params.append('lastName',searchForm.lastName);
      if (searchForm.email !=null) params = params.append('email',searchForm.email);
      if (searchForm.cpf !=null) params = params.append('cpf',searchForm.cpf);
      if (searchForm.state !=null) {
        params = params.delete('state');
        params = params.append('state',searchForm.state);
      } 
    }
    return this.http.get<any>(`${environment.apiUrl}/api/customer`, { params });
  }

  getCustomerById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/customer/${id}`);
  }

  createCustomer(formData: Object) {
    return this.http.post<any>(`${environment.apiUrl}/api/customer/`, formData);
  }

  updateCustomer(formData: Object, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/api/customer/${id}`, formData);
  }

  deleteCustomer(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/api/customer/${id}`);
  }

  findCustomerByUsername(username: string){
    return this.http.get<any[]>(`${environment.apiUrl}/api/customer/findByName/${username}`).pipe(take(1))
  }

  findCustomerByDescription(customer: Object) {
    return this.http.get<any>(`${environment.apiUrl}/api/customer/findByDescription/`, customer);
  }

}



