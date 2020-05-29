import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OwnerService } from '../owner.service';
import { AddEditOwner } from '../../../shared/models/main.model';
import { AppRoute } from '../../../shared/app.route';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-owners',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class OwnersAddEditComponent implements OnInit {
  isEditMode: boolean = false;
  ownersForm: FormGroup;
  firstName = '';
  lastName = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private api: OwnerService, private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.ownersForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
    let id = this.route.snapshot.params.id;
    if (id !== undefined && id != 0) {
      if (this.api.ownerModel != undefined) {
        this.isEditMode = true;
        this.ownersForm.controls.firstName.setValue(this.api.ownerModel.first_name);
        this.ownersForm.controls.lastName.setValue(this.api.ownerModel.last_name);
      } else {
        this.router.navigate([AppRoute.ListOwner]);
      }
    }
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    let model = new AddEditOwner();
    model.id = this.isEditMode ? this.api.ownerModel.id : 0;
    model.first_name = this.ownersForm.controls.firstName.value;
    model.last_name = this.ownersForm.controls.lastName.value;

    this.api.addEditOwner(model).subscribe((res: any) => {
      this.isLoadingResults = false;
      this.router.navigate([AppRoute.ListOwner]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}

