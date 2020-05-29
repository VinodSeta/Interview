import { Injectable } from '@angular/core';
import { OwnerApi } from '../../shared/api.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api.response';
import { AddEditOwner } from '../../shared/models/main.model';

@Injectable()
export class OwnerService {
  ownerModel: AddEditOwner;
  ownerId: number = 0;
  constructor(public http: HttpClient) { }

  getOwnersList() {
    return this.http.get<ApiResponse>(OwnerApi.getOwnersList);
  }

  addEditOwner(model: AddEditOwner) {
    return this.http.post<ApiResponse>(OwnerApi.addEditOwner, model);
  }

  deleteOwner(id) {
    let params = new HttpParams().set('id', id);
    var apiurl = this.http.get<ApiResponse>(OwnerApi.deleteOwners, { params: params });
    return apiurl;
  }
}
