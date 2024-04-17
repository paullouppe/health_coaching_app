import { getAppointments } from "@/services/appointment";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AppointmentCalendar() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const fetchAppointments = async () => {
            const fetchedAppointments = await getAppointments();
            setAppointments(fetchedAppointments);
        };

        fetchAppointments();
    }, []);

    const getNextAppointment = useMemo(() => {
        if (!appointments || appointments.length === 0) return "None";

        const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date));
        return new Date(sortedAppointments[0].appointment.appointmentDate).toLocaleDateString('en-US');
    }, [appointments]);

    const renderAppointmentList = () => {
        let apps = [];
        const currentDate = new Date(date).toISOString().slice(0, 10);  // Normalize and convert to ISO string format YYYY-MM-DD
        appointments.forEach(app => {
            const appDate = new Date(app.appointment.appointmentDate);
            const appDateWithoutHours = new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate()).toISOString().slice(0, 10);  // Normalize and convert to ISO string format YYYY-MM-DD
            if (currentDate === appDateWithoutHours) {
                apps.push(app);
            }
        });
        return apps;
    };

    const getSpecialDateList = () => {
        let specialDates = [];
        appointments.forEach(app => {
            const appDate = new Date(app.appointment.appointmentDate);
            specialDates.push(new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate()))
        });
        return specialDates;
    }

    const goPatientList = () => navigate('/patients');

    return (
        <div className="flex flex-col gap-4 px-4 pb-4">
            <div className="absolute top-4 left-2 flex cursor-pointer" onClick={goPatientList}>
                <ChevronLeft /> Back
            </div>
            <h1 className="text-center text-xl font-medium mt-11">Schedule</h1>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border" 
                specialDates={getSpecialDateList()}/>

            {(renderAppointmentList().length > 0) &&
                <Card className="flex flex-col items-center gap-0">
                    <div className="mt-4">
                        Appointment(s) for the {date.toLocaleDateString()}
                    </div>
                    <div className="p-4 w-full flex flex-col gap-2">
                        {renderAppointmentList().map((app, i) =>
                            <Card key={i} className="p-4">
                                <div className="truncate font-medium capitalize">{app.appointment.title}</div>
                                <div className="truncate text-sm text-[#7C3AED]">
                                    <span>{app.appointment.firstname}</span> <span>{app.appointment.lastname}</span>
                                </div>
                                <div className="truncate">{app.appointment.description}</div>
                                <div className="text-right text-sm">
                                    {new Date(app.appointment.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}
                                </div>
                            </Card>
                        )}
                    </div>
                </Card>}
            <Card className="flex flex-col gap-2 p-4">
                <div className="flex gap-2">
                    <CalendarClock />
                    Next appointment
                </div>
                <div className="text-[#3A52ED] font-medium text-center text-lg">{getNextAppointment}</div>
            </Card>
        </div>
    )
}

export default AppointmentCalendar;