import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppointmentService } from '../appointment.service';
import { AddEditPet, AddEditAppointment } from '../../../shared/models/main.model';
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
  selector: 'app-add-edit-appointments',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AppointmentsAddEditComponent implements OnInit {
  petList: DropdownModel[];
  ownerList: DropdownModel[];
  timeSlots: DropdownModel[];
  isEditMode: boolean = false;
  appointmentsForm: FormGroup;
  firstName = '';
  lastName = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private api: AppointmentService, private router: Router,
    private formBuilder: FormBuilder) {
    this.getOwnerList();
    this.getTimeSlotList();
  }

  ngOnInit(): void {

    this.appointmentsForm = this.formBuilder.group({
      owner_id: ['', Validators.required],
      pet_id: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentSlot: ['', Validators.required],
    });
    let id = this.route.snapshot.params.id;
    if (id !== undefined && id != 0) {
      if (this.api.apModel != undefined) {
        this.isEditMode = true;
        this.appointmentsForm.setValue({
          owner_id: this.api.apModel.owner_id,
          pet_id: this.api.apModel.pet_id,
          appointmentDate: this.api.apModel.appointmentDate,
          appointmentSlot: this.api.apModel.appointmentSlot,
        });
      } else {
        this.router.navigate([AppRoute.ListAppointments]);
      }
    }
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    let model = new AddEditAppointment();
    model.id = this.isEditMode ? this.api.apModel.id : 0;
    model.pet_id = this.appointmentsForm.controls.pet_id.value;
    model.appointmentDate = this.appointmentsForm.controls.appointmentDate.value;
    model.appointmentSlot = this.appointmentsForm.controls.appointmentSlot.value;

    this.api.addEditAppointment(model).subscribe((res: any) => {
      this.isLoadingResults = false;
      if (res.status == 0) {
        alert(res.message);
      }
      this.router.navigate([AppRoute.ListAppointments]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  getTimeSlotList(): void {
    this.api.getTimeSlotList().subscribe(res => {
      this.timeSlots = res.data.data;
    });
  }

  getOwnerList(): void {
    this.api.getOwnersList().subscribe(res => {
      this.ownerList = res.data.data;
    });
  }

  onChangeOwner(): void {
    var ownerId = this.appointmentsForm.controls.owner_id.value;
    this.api.getPetsList(ownerId).subscribe(res => {
      this.petList = res.data.data;
    });
  }
}

