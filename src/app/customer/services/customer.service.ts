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

  findAllPaginated(pager: PageEvent,  sortBy:{field?: string,asc?: boolean}, selectedState: boolean|number, query?: string) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);

    if (query) params = params.append('query', query);
    if (sortBy.field&&sortBy.asc) params = params.append('sort', sortBy.field+',asc');   
    if (sortBy.field&&!sortBy.asc) params = params.append('sort', sortBy.field+',desc'); 
    if (selectedState!=1000) params = params.append('state',selectedState);

    return this.http.get<any>(`${environment.apiUrl}/api/customer`, { params });
  }

  getCustomerById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/customer/${id}`);
  }

  createUser(formData: Object) {
    return this.http.post<any>(`${environment.apiUrl}/api/customer/`, formData);
  }

  updateUser(formData: Object, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/api/customer/${id}`, formData);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/api/customer/${id}`);
  }

  findUserByUsername(username: string){
    return this.http.get<any[]>(`${environment.apiUrl}/api/customer/findByName/${username}`).pipe(take(1))
  }

  findUserByDescription(user: Object) {
    return this.http.get<any>(`${environment.apiUrl}/api/customer/findByDescription/`, user);
  }

}



