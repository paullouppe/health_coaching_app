import { Card } from "@/components/ui/card";
import { getPeopleById } from "@/services/health_api";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "./functional_pages/Errors";
import { Button } from "@/components/ui/button"; 
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";  // Assume you have an icon for the calendar or add an appropriate one

const AppointmentSchema = z.object({
  appointmentDate: z.date().optional(),
});

function Appointment() {
    let { patientId } = useParams();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(AppointmentSchema),
    });

    const [patient, setPatient] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPeopleById(patientId);
                setPatient(data);
            } catch (err) {
                console.error(err);
                setHasErrors(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [patientId]);

    const onSubmit = (data) => {
        console.log('Appointment Data:', data);
    };

    const goBack = () => navigate(-1);

    if (hasErrors) {
        return <Errors />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-2 px-4">
            <div className="absolute top-4 left-2 flex cursor-pointer" onClick={goBack}>
                <ChevronLeft /> Back
            </div>
            <div className="font-medium text-2xl mt-10">
                Appointment
            </div>
            <Card className="flex place-items-center gap-2 w-full p-3 font-medium">
                <img src={patient.icon} className="w-8 h-8" />
                <div>
                    <span className="uppercase">{patient.lastname}</span> {patient.firstname}
                </div>
            </Card>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] pl-3 text-left font-normal text-muted-foreground">
                            {form.watch('appointmentDate') ? format(form.watch('appointmentDate'), "PPP") : 'Select Date'}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={form.watch('appointmentDate')}
                            onSelect={(date) => form.setValue('appointmentDate', date)}
                        />
                    </PopoverContent>
                </Popover>
                <Button className="w-44" type="submit">Confirm</Button>
            </form>
        </div>
    );
}

export default Appointment;
