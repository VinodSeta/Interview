import { Component, OnInit } from '@angular/core';
import { AddEditOwner } from '../../../shared/models/main.model';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';
import { AppRoute } from '../../../shared/app.route';

@Component({
  selector: 'app-list-owners',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class OwnersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'first_name', 'last_name'];
  data: AddEditOwner[] = [];
  isLoadingResults = true;

  constructor(private readonly router: Router,
    private api: OwnerService) { }

  ngOnInit(): void {
    this.bindOwnersList();
  }

  bindOwnersList(): void {
    this.api.getOwnersList()
      .subscribe((res: any) => {
        this.data = res.data.data;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  editOwners(row): void {
    this.api.ownerModel = new AddEditOwner();
    this.api.ownerModel.id = row.id;
    this.api.ownerModel.first_name = row.first_name;
    this.api.ownerModel.last_name = row.last_name;
    this.router.navigate([AppRoute.editOwner, row.id]);
  }

  deleteOwners(row): void {
    this.api.ownerId = row.id;
    this.api.deleteOwner(row.id).subscribe((res: any) => {
      this.isLoadingResults = false;
      this.bindOwnersList();
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  petList(row): void {
    this.router.navigate([AppRoute.ListPet]);
  }
}
