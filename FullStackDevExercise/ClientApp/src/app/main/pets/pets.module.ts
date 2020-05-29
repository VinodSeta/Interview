import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PetsListComponent } from './list/list.component';
import { PetsAddEditComponent } from './add-edit/add-edit.component';
import { PetService } from './pet.service';
import { MaterialModule } from '../../shared/material.module';

const routes = [
  {
    path: "list",
    component: PetsListComponent,
  },
  {
    path: "add",
    component: PetsAddEditComponent,
  },
  {
    path: "edit/:id",
    component: PetsAddEditComponent,
  },
  {
    path: "**",
    redirectTo: "list"
  }
];

@NgModule({
  declarations: [
    PetsListComponent,
    PetsAddEditComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [],
  providers: [PetService]
})
export class PetsModule { }
