import { Card } from "@/components/ui/card";
import { getPeopleById } from "@/services/health_api";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "./functional_pages/Errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";  // Assume you have an icon for the calendar or add an appropriate one
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller } from "react-hook-form";
import { setAppointment } from "@/services/appointment";

const AppointmentSchema = z.object({
    appointmentDate: z.date(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
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
    const [selectedTime, setSelectedTime] = useState('');

    const hours = [
        { key: "8", value: "8 am" },
        { key: "9", value: "9 am" },
        { key: "10", value: "10 am" },
        { key: "11", value: "11 am" },
        { key: "13", value: "1 pm" },
        { key: "14", value: "2 pm" },
        { key: "15", value: "3 pm" },
        { key: "16", value: "4 pm" },
        { key: "17", value: "5 pm" }
    ]

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
        data.appointmentDate.setHours(selectedTime);
        setAppointment(patientId, data)
        return navigate(-1);
    };

    const goBack = () => navigate(-1);

    if (hasErrors) {
        return <Errors />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4 px-4">
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
                <Input
                    placeholder="Title"
                    {...form.register("title", { required: true })}
                />
                {form.formState.errors.title && (
                    <div className="text-red-500 text-xs">
                        {form.formState.errors.title.message}
                    </div>
                )}
                <textarea
                    className="flex h-40 w-full rounded-md border-2 border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Description..."
                    {...form.register("description", { required: true })}
                />
                {form.formState.errors.description && (
                    <div className="text-red-500 text-xs">
                        {form.formState.errors.description.message}
                    </div>
                )}

                <div className="flex gap-2">
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

                    <Select onValueChange={(value) => { setSelectedTime(value); }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                            {hours.map((hour) => (
                                <SelectItem key={hour.key} value={hour.key}>
                                    {hour.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button className="mt-4" type="submit">Confirm</Button>
            </form>
        </div>
    );
}

export default Appointment;
