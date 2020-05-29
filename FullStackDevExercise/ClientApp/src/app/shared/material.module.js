"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OwnerApi = /** @class */ (function () {
    function OwnerApi() {
    }
    OwnerApi.addEditOwner = '/api/Owner/AddEditOwner';
    OwnerApi.getOwnersList = '/api/Owner/GetOwnersList';
    OwnerApi.deleteOwners = '/api/Owner/DeleteOwners';
    return OwnerApi;
}());
exports.OwnerApi = OwnerApi;
var PetApi = /** @class */ (function () {
    function PetApi() {
    }
    PetApi.getOwnersList = '/api/Pet/GetOwnersList';
    PetApi.addEditPet = '/api/Pet/AddEditPet';
    PetApi.getPetsList = '/api/Pet/GetPetsList';
    PetApi.deletePets = '/api/Pet/DeletePets';
    return PetApi;
}());
exports.PetApi = PetApi;
var AppointmentApi = /** @class */ (function () {
    function AppointmentApi() {
    }
    AppointmentApi.getOwnersList = '/api/Pet/GetOwnersList';
    AppointmentApi.getPetsList = '/api/Appointment/GetPetsList';
    AppointmentApi.getAppointmentsList = '/api/Appointment/getAppointmentsList';
    AppointmentApi.addEditAppointment = '/api/Appointment/AddEditAppointment';
    AppointmentApi.deleteAppointment = '/api/Appointment/DeleteAppointment';
    return AppointmentApi;
}());
exports.AppointmentApi = AppointmentApi;
//# sourceMappingURL=api.url.js.map