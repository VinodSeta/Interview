import { Injectable } from '@angular/core';
import { AppointmentApi } from '../../shared/api.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api.response';
import { AddEditAppointment } from '../../shared/models/main.model';

@Injectable()
export class AppointmentService {
  apModel: AddEditAppointment;
  appointmentId: number = 0;
  constructor(public http: HttpClient) { }

  getOwnersList() {
    return this.http.get<ApiResponse>(AppointmentApi.getOwnersList);
  }

  getPetsList(id) {
    let params = new HttpParams().set('id', id);
    var apiurl = this.http.get<ApiResponse>(AppointmentApi.getPetsList, { params: params });
    return apiurl;
  }
  getTimeSlotList() {
    return this.http.get<ApiResponse>(AppointmentApi.getTimeSlotList);
  }

  //isAppointmentBook(id: string, slot: string) {
  //  let params = new HttpParams().set('id', id).set('slot', slot);
  //  return this.http.get<ApiResponse>(AppointmentApi.isAppointmentBook);
  //}

  getAppointmentsList() {
    return this.http.get<ApiResponse>(AppointmentApi.getAppointmentsList);
  }

  addEditAppointment(model: AddEditAppointment) {
    return this.http.post<ApiResponse>(AppointmentApi.addEditAppointment, model);
  }

  deleteAppointment(id) {
    let params = new HttpParams().set('id', id);
    var apiurl = this.http.get<ApiResponse>(AppointmentApi.deleteAppointment, { params: params });
    return apiurl;
  }
}
