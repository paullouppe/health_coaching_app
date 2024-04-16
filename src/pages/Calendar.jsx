import { getAppointments } from "@/services/appointment";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
        console.log(appointments);
        if (!appointments || appointments.length === 0) return "None";
    
        const sortedAppointments = [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date));
        return new Date(sortedAppointments[sortedAppointments.length - 1].appointment.appointmentDate).toLocaleDateString('en-US');
    }, [appointments]);
    
    
    const goPatientList = () => navigate('/patients');


    return (
        <div className="flex flex-col gap-2 px-4">
            <div className="absolute top-4 left-2 flex cursor-pointer" onClick={goPatientList}>
                <ChevronLeft /> Back
            </div>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border" />

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