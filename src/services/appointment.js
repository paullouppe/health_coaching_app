const APPOINTMENT_KEY = "appointments";

export const setAppointment = (personId, appointment) => {
    let appointments = JSON.parse(localStorage.getItem(APPOINTMENT_KEY));
    if(!appointments) {
        localStorage.setItem(APPOINTMENT_KEY, []);
        appointments = [];
    }
    appointments.push({personId: personId, appointment: appointment});
    localStorage.setItem(APPOINTMENT_KEY, JSON.stringify(appointments))
}

export const getAppointmentsByPersonId = (personId) => {
    let appointments = JSON.parse(localStorage.getItem(APPOINTMENT_KEY));
    let personAppointments = [];
    appointments.forEach(app => {
        if(app.personId === personId){
            personAppointments.push(app);
        }
    });
    console.log(`Person appointments : ${personAppointments}`);
    return personAppointments;
}

export const getAppointments = () => {
    let appointments = localStorage.getItem(APPOINTMENT_KEY);
    if (appointments == null) return [];
    return JSON.parse(appointments);
}