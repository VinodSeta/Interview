import { Component, OnInit } from '@angular/core';
import { AddEditPet } from '../../../shared/models/main.model';
import { PetService } from '../pet.service';
import { Router } from '@angular/router';
import { AppRoute } from '../../../shared/app.route';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PetsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'owner', 'name', 'type', 'age'];
  data: AddEditPet[] = [];
  isLoadingResults = true;

  constructor(private readonly router: Router,
    private api: PetService) { }

  ngOnInit(): void {
    this.bindPetsList();
  }

  bindPetsList(): void {
    this.api.getPetList()
      .subscribe((res: any) => {
        this.data = res.data.data;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  editPets(row): void {
    this.api.petModel = new AddEditPet();
    this.api.petModel.id = row.id;
    this.api.petModel.owner_id = row.owner_id;
    this.api.petModel.type = row.type;
    this.api.petModel.name = row.name;
    this.api.petModel.age = row.age;
    this.router.navigate([AppRoute.editPet, row.id]);
  }

  deletePets(row): void {
    this.api.petId = row.id;
    this.api.deletePet(row.id).subscribe((res: any) => {
      this.isLoadingResults = false;
      this.bindPetsList();
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  appointmentsList(row): void {
    this.router.navigate([AppRoute.ListAppointments]);
  }
}
