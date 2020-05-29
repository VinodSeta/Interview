export class AddEditAppointment {
  id: number;
  pet_id: number;
  owner_id: number;
  appointmentDate: Date;
  appointmentSlot: string;
}

export class AddEditOwner {
  id: number;
  first_name: string;
  last_name: string;
}

export class AddEditPet {
  id: number;
  owner_id: number;
  type: string;
  name: string;
  age: number;
}
