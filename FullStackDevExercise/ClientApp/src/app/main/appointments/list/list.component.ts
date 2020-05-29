import { Component, OnInit } from '@angular/core';
import { AddEditAppointment } from '../../../shared/models/main.model';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { AppRoute } from '../../../shared/app.route';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'owner', 'type', 'name', 'date', 'slot'];
  data: AddEditAppointment[] = [];
  isLoadingResults = true;

  constructor(private readonly router: Router,
    private api: AppointmentService) { }

  ngOnInit(): void {
    this.bindAppointmentsList();
  }

  bindAppointmentsList(): void {
    this.api.getAppointmentsList()
      .subscribe((res: any) => {
        this.data = res.data.data;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  editAppointments(row): void {
    this.api.apModel = new AddEditAppointment();
    this.api.apModel.id = row.id;
    this.api.apModel.pet_id = row.pet_id;
    this.api.apModel.appointmentDate = row.appointmentDate;
    this.api.apModel.appointmentSlot = row.appointmentSlot;
    this.router.navigate([AppRoute.editAppointments, row.id]);
  }

  deleteAppointments(row): void {
    this.api.appointmentId = row.id;
    this.api.deleteAppointment(row.id).subscribe((res: any) => {
      this.isLoadingResults = false;
      this.bindAppointmentsList();
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  appointmentsList(row): void {
    this.router.navigate([AppRoute.ListAppointments]);
  }
}
