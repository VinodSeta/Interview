import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OwnersModule } from './owners/owners.module';
import { PetsModule } from './pets/pets.module';
import { AppointmentsModule } from './appointments/appointments.module';

const routes = [
  {
    path: "owners",
    loadChildren: () => OwnersModule,

  },
  {
    path: "pets",
    loadChildren: () => PetsModule,
  },
  {
    path: "appointments",
    loadChildren: () => AppointmentsModule,
  },
  {
    path: "**",
    redirectTo: "owners"
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})

export class MainModule { }
