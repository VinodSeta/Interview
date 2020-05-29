import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PetService } from '../pet.service';
import { AddEditPet } from '../../../shared/models/main.model';
import { AppRoute } from '../../../shared/app.route';
import { ValidationService } from '../../../shared/validation.service';
import { DropdownModel } from '../../../shared/models/api.response';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-pets',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class PetsAddEditComponent implements OnInit {
  petTypes: any;
  ownerList: DropdownModel[];
  isEditMode: boolean = false;
  petsForm: FormGroup;
  firstName = '';
  lastName = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private api: PetService, private router: Router,
    private formBuilder: FormBuilder) {
    this.getOwnerList();
    this.petTypes = [
      { value: 'Cats', text: 'Cats' },
      { value: 'Dogs and Puppies', text: 'Dogs and Puppies' },
      { value: 'Hamster', text: 'Hamster' },
      { value: 'Gold Fish', text: 'Gold Fish' },
      { value: 'Rabbits', text: 'Rabbits' },
    ];
  }

  ngOnInit(): void {

    this.petsForm = this.formBuilder.group({
      owner_id: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      age: ["", [ValidationService.onlyNumberValidator]],
    });
    let id = this.route.snapshot.params.id;
    if (id !== undefined && id != 0) {
      if (this.api.petModel != undefined) {
        this.isEditMode = true;
        this.petsForm.setValue({
          owner_id: this.api.petModel.owner_id,
          type: this.api.petModel.type,
          name: this.api.petModel.name,
          age: this.api.petModel.age,
        });
      } else {
        this.router.navigate([AppRoute.ListPet]);
      }

    }
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    let model = new AddEditPet();
    model.id = this.isEditMode ? this.api.petModel.id : 0;
    model.owner_id = this.petsForm.controls.owner_id.value;
    model.type = this.petsForm.controls.type.value;
    model.name = this.petsForm.controls.name.value;
    model.age = parseInt(this.petsForm.controls.age.value);
    this.api.addEditPet(model).subscribe((res: any) => {
      this.isLoadingResults = false;
      this.router.navigate([AppRoute.ListPet]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  getOwnerList(): void {
    this.api.getOwnersList().subscribe(res => {
      this.ownerList = res.data.data;
    });
  }
}

