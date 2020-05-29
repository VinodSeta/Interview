import { Injectable } from '@angular/core';
import { PetApi } from '../../shared/api.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api.response';
import { AddEditPet } from '../../shared/models/main.model';

@Injectable()
export class PetService {
  petModel: AddEditPet;
  petId: number = 0;
  constructor(public http: HttpClient) { }

  getOwnersList() {
    return this.http.get<ApiResponse>(PetApi.getOwnersList);
  }

  getPetList() {
    return this.http.get<ApiResponse>(PetApi.getPetsList);
  }

  addEditPet(model: AddEditPet) {
    return this.http.post<ApiResponse>(PetApi.addEditPet, model);
  }

  deletePet(id) {
    let params = new HttpParams().set('id', id);
    var apiurl = this.http.get<ApiResponse>(PetApi.deletePets, { params: params });
    return apiurl;
  }
}
