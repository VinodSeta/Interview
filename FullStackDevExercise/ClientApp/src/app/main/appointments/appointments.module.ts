import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentsListComponent } from './list/list.component';
import { AppointmentsAddEditComponent } from './add-edit/add-edit.component';
import { AppointmentService } from './appointment.service';
import { MaterialModule } from '../../shared/material.module';

const routes = [
  {
    path: "list",
    component: AppointmentsListComponent,
  },
  {
    path: "add",
    component: AppointmentsAddEditComponent,
  },
  {
    path: "edit/:id",
    component: AppointmentsAddEditComponent,
  },
  {
    path: "**",
    redirectTo: "list"
  }
];

@NgModule({
  declarations: [
    AppointmentsListComponent,
    AppointmentsAddEditComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [],
  providers: [AppointmentService]
})
export class AppointmentsModule { }
