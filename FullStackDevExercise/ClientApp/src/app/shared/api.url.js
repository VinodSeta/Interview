"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OwnerApi = /** @class */ (function () {
    function OwnerApi() {
    }
    OwnerApi.addEditOwner = '/api/Owners/AddEditOwner';
    OwnerApi.getOwnersList = '/api/Owners/GetOwnersList';
    OwnerApi.deleteOwners = '/api/Owners/DeleteOwners';
    return OwnerApi;
}());
exports.OwnerApi = OwnerApi;
var PetApi = /** @class */ (function () {
    function PetApi() {
    }
    PetApi.getOwnersList = '/api/Pets/GetOwnersList';
    PetApi.addEditPet = '/api/Pets/AddEditPet';
    PetApi.getPetsList = '/api/Pets/GetPetsList';
    PetApi.deletePets = '/api/Pets/DeletePets';
    return PetApi;
}());
exports.PetApi = PetApi;
var AppointmentApi = /** @class */ (function () {
    function AppointmentApi() {
    }
    AppointmentApi.getOwnersList = '/api/Appointments/GetOwnersList';
    AppointmentApi.getPetsList = '/api/Appointments/GetPetsList';
    AppointmentApi.getAppointmentsList = '/api/Appointments/GetAppointmentsList';
    AppointmentApi.getTimeSlotList = '/api/Appointments/GetTimeSlotList';
    AppointmentApi.isAppointmentBook = '/api/Appointments/IsAppointmentBook';
    AppointmentApi.addEditAppointment = '/api/Appointments/AddEditAppointment';
    AppointmentApi.deleteAppointment = '/api/Appointments/DeleteAppointment';
    return AppointmentApi;
}());
exports.AppointmentApi = AppointmentApi;
//# sourceMappingURL=api.url.js.map