import { useState, useEffect } from "react";
import { getPeopleById } from "@/services/health_api";
import { useParams } from "react-router-dom";
import Errors from "./functional_pages/Errors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientDetailPersonal from "@/components/custom_components/patient_details_tabs/PatientDetailPersonal";
import PatientDetailPhysical from "@/components/custom_components/patient_details_tabs/PatientDetailPhysical";
import PatientDetailPsychology from "@/components/custom_components/patient_details_tabs/PatientDetailPsychology";

function Patient() {
  let { patientId } = useParams();

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

  if (hasErrors) {
    return <Errors />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    //base of what I have done with the patient data
    // <div className="text-center">
    //     <img className="ml-4 w-20 h-20" src={"../"+patient.icon}/>
    //     <div>
    //         <span className="uppercase">{patient.lastname}</span> {patient.firstname}
    //     </div>
    //     <div>Sex : {(patient.sex === 1) ? "Man" : "Woman"}</div>
    //     <div>Height : {patient.height}</div>
    //     <div>Weight : {patient.weightStart}</div>
    //     <div>Weight Goal : {patient.weightGoal}</div>
    //     <Link to={"/patients"}>
    //         <Button>Retour</Button>
    //     </Link>
    // </div>

    <div>
      <div className="flex justify-left">
        back
        <span className="flex justify-center w-full">image</span>
      </div>

      <div className="flex justify-center w-full">Name</div>

      <div className="flex justify-center w-full">body</div>
      <br></br>

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
            <PatientDetailPersonal />
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
