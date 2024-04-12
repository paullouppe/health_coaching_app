import { useState, useEffect } from "react";
import { getPeopleById, getPhysicalActivitiesByPeopleId, getPhysiologicalDataByPeopleId, getPsychologicalDataByPeopleId } from "@/services/health_api";
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
  const [physicalActivities, setPhysicalActivities] = useState({});
  const [physiologicalData, setPhysiologicalData] = useState({});
  const [psychologicalData, setPsychologicalData] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          getPeopleById(patientId),
          getPhysicalActivitiesByPeopleId(patientId),
          getPhysiologicalDataByPeopleId(patientId),
          getPsychologicalDataByPeopleId(patientId),
        ]);

        setPatient(data[0]);
        setPhysicalActivities(data[1]);
        setPhysiologicalData(data[2]);
        setPsychologicalData(data[3]);
      } catch (err) {
        console.error(err);
        setHasErrors(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  const goPatientList = () => navigate('/patients');

  if (hasErrors) {
    return <Errors />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="absolute top-4 left-2 flex cursor-pointer" onClick={goPatientList}>
        <ChevronLeft /> Back
      </div>

      <img className="w-20 mt-4" src={patient.icon} alt="patient icon" />

      <div className="font-medium text-2xl">
        <span className="uppercase">{patient.lastname}</span> {patient.firstname}
      </div>

      <div className="text-sm font-bold text-[#3A52ED]">
        {patient.activityProfile}
      </div>

      <div className="flex w-full">
        <Tabs defaultValue="psychology" className="w-full max-w-screen-lg px-4">
          <TabsList className="flex w-full">
            <TabsTrigger value="personal" className="flex-1">
              Personal
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex-1">
              Physical
            </TabsTrigger>
            <TabsTrigger value="psychology" className="flex-1">
              Psychology
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PatientDetailPersonal patient={patient} />
          </TabsContent>
          <TabsContent value="physical">
            <PatientDetailPhysical patient={patient} physiologicalData={physiologicalData} physicalActivities={physicalActivities} />
          </TabsContent>
          <TabsContent value="psychology">
            <PatientDetailPsychology patient={patient} psychologicalData={psychologicalData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Patient;
