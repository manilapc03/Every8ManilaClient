import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeListModel, EmployeeModel } from '../model/employeemodel';

@Injectable({
  providedIn: 'root',
})
export class Api {

  ApiEndpoint = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  SaveEmployee(data: EmployeeModel) {
    return this.http.post(this.ApiEndpoint, data);
  }

  GetallEmployee() {
    return this.http.get<EmployeeListModel[]>(this.ApiEndpoint);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.ApiEndpoint}/${id}`);
  }

  getEmployeeById(id: string) {
    return this.http.get<EmployeeModel>(`${this.ApiEndpoint}/${id}`);
  }

  UpdateEmployee(id: string, data: EmployeeModel) {
    return this.http.put(`${this.ApiEndpoint}/${id}`, data);
  }
  
}
