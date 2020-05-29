import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';

const routes: Routes = [
  {
    path: 'main', loadChildren: () => MainModule
  },
  {
    path: '**',
    redirectTo: 'main/owners',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
