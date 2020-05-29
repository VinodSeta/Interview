import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OwnersListComponent } from './list/list.component';
import { OwnersAddEditComponent } from './add-edit/add-edit.component';
import { OwnerService } from './owner.service';
import { MaterialModule } from '../../shared/material.module';

const routes = [
  {
    path: "list",
    component: OwnersListComponent,
    data: { title: 'List of Owners' }
  },
  {
    path: "add",
    component: OwnersAddEditComponent,
    data: { title: 'Add Owners' }
  },
  {
    path: "edit/:id",
    component: OwnersAddEditComponent,
    data: { title: 'Edit Owners' }
  },
  {
    path: "**",
    redirectTo: "list"
  }
];

@NgModule({
  declarations: [
    OwnersListComponent,
    OwnersAddEditComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [],
  providers: [OwnerService]
})
export class OwnersModule { }
