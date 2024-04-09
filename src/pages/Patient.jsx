import { useState, useEffect } from "react";
import { getPeopleById } from "@/services/health_api";
import { useParams, useNavigate } from "react-router-dom";
import Errors from "./functional_pages/Errors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientDetailPersonal from "@/components/custom_components/patient_details_tabs/PatientDetailPersonal";
import PatientDetailPhysical from "@/components/custom_components/patient_details_tabs/PatientDetailPhysical";
import PatientDetailPsychology from "@/components/custom_components/patient_details_tabs/PatientDetailPsychology";
import { ChevronLeft } from 'lucide-react';

function Patient() {
  let { patientId } = useParams();

  const navigate = useNavigate();

  const [patient, setPatient] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //get patient data
  useEffect(() => {
    getPeopleById(patientId)
      .then((data) => {
        setPatient(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setHasErrors(true);
      });
  }, []);

  const goPatientList = () => {
    return navigate('/patients')
  }

  if (hasErrors) {
    return <Errors />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="absolute top-4 left-2 flex cursor-pointer" onClick={goPatientList}>
        <ChevronLeft /> Back
      </div>

      <img className="w-20 mt-4" src={patient.icon}/>

      <div className="font-medium text-2xl">
        <span className="uppercase">{patient.lastname}</span> {patient.firstname}
      </div>

      <div className="text-sm font-bold text-[#3A52ED]">
        {patient.activityProfile}
      </div>
      

      <div className="flex justify-center w-full">
        <Tabs defaultValue="personal" className="w-full max-w-screen-lg px-4">
          <TabsList className="flex w-full">
            <TabsTrigger value="personal" className="flex-1">
              Personal
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex-1 ">
              Physical
            </TabsTrigger>
            <TabsTrigger value="psychology" className="flex-1 ">
              Psychology
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PatientDetailPersonal patient={patient} />
          </TabsContent>
          <TabsContent value="physical">
            <PatientDetailPhysical />
          </TabsContent>
          <TabsContent value="psychology">
            <PatientDetailPsychology />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Patient;
