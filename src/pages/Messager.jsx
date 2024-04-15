import { getPeopleById } from "@/services/health_api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, SendHorizontal } from "lucide-react";

function Messager() {
  let { patientId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([getPeopleById(patientId)]);
        setPatient(data[0]);
      } catch (err) {
        console.error(err);
        setHasErrors(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  const goPatient = () => navigate(`/patient/${patient.id}`);

  return (
    
    <div className="flex flex-col items-center gap-1">
      <div
        className="absolute top-4 left-2 flex cursor-pointer"
        onClick={goPatient}
      >
        <ChevronLeft /> Back
      </div>

      <img className="w-20 mt-4" src={patient.icon} alt="patient icon" />
      <div className="font-medium text-2xl">
        <span className="uppercase">{patient.lastname}</span>{" "}
        {patient.firstname}
      </div>

        <div
            className="flex-left"
            type="text"
            style={{ width: "50%", borderRadius : "8px", height : "30px", backgroundColor:"#000000" }}
            placeholder="  Write a message..."
            />




      <form
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          padding: "20px",
          display: "flex",
          alignItems: "center", 
          justifyContent: "space-between", 
          
        }}
      >
        <input
          type="text"
          style={{ width: "90%", marginRight: "10px", borderRadius : "8px", height : "30px" }}
          placeholder="  Write a message..."
        />
        <SendHorizontal style={{ fontSize: "24px" }} />{" "}
      </form>
    </div>
  );
}

export default Messager;
