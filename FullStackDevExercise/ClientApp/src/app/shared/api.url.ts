export class OwnerApi {
  static addEditOwner: string = '/api/Owners/AddEditOwner';
  static getOwnersList: string = '/api/Owners/GetOwnersList';
  static deleteOwners: string = '/api/Owners/DeleteOwners';
}

export class PetApi {
  static getOwnersList: string = '/api/Pets/GetOwnersList';
  static addEditPet: string = '/api/Pets/AddEditPet';
  static getPetsList: string = '/api/Pets/GetPetsList';
  static deletePets: string = '/api/Pets/DeletePets';
}

export class AppointmentApi {
  static getOwnersList: string = '/api/Appointments/GetOwnersList';
  static getPetsList: string = '/api/Appointments/GetPetsList';
  static getAppointmentsList: string = '/api/Appointments/GetAppointmentsList';
  static getTimeSlotList: string = '/api/Appointments/GetTimeSlotList';
  static isAppointmentBook: string = '/api/Appointments/IsAppointmentBook';
  static addEditAppointment: string = '/api/Appointments/AddEditAppointment';
  static deleteAppointment: string = '/api/Appointments/DeleteAppointment';
}
