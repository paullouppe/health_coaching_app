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
        style={{
          width: "53%",
          borderRadius: "8px",
          backgroundColor: "#7C3AED",
          marginLeft: "auto",
          marginRight: "20px",
          color: "#FFFFFF",
          textAlign: "left",
          paddingLeft: "10px",
          paddingTop: "3px",
          paddingBottom: "3px",
          marginBottom: "5px",
          marginTop: "15px"
        }}
        placeholder="  Write a message..."
      >
        {" "}
        Hello {patient.firstname} ! How you feel ? 
      </div>

      

      <div
        className="flex-left"
        type="text"
        style={{
          width: "53%",
          borderRadius: "8px",
          backgroundColor: "#E6E6E6",
          marginRight: "auto",
          marginLeft: "20px",
          color: "#000000",
          textAlign: "left",
          paddingLeft: "10px",
          paddingTop: "3px",
          paddingBottom: "3px",
          marginBottom: "5px"
        }}
      >
        {" "}
        I’m doing great with your training, thank you !{" "}
      </div>

      <div
        className="flex-left"
        type="text"
        style={{
          width: "53%",
          borderRadius: "8px",
          backgroundColor: "#7C3AED",
          marginLeft: "auto",
          marginRight: "20px",
          color: "#FFFFFF",
          textAlign: "left",
          paddingLeft: "10px",
          paddingTop: "3px",
          paddingBottom: "3px",
          marginBottom: "5px"
        }}
      >
        {" "}
        Do you want to take a new appointement ? 
      </div>

      <div
        className="flex-left"
        type="text"
        style={{
          width: "53%",
          borderRadius: "8px",
          backgroundColor: "#E6E6E6",
          marginRight: "auto",
          marginLeft: "20px",
          color: "#000000",
          textAlign: "left",
          paddingLeft: "10px",
          paddingTop: "3px",
          paddingBottom: "3px",
          marginBottom: "5px"
        }}
      >
        {" "}
        Yes ! I’m free April 21th Monday at 14pm if it’s okay for you ?{" "}
      </div>

      <div
        className="flex-left"
        type="text"
        style={{
          width: "53%",
          borderRadius: "8px",
          backgroundColor: "#7C3AED",
          marginLeft: "auto",
          marginRight: "20px",
          color: "#FFFFFF",
          textAlign: "left",
          paddingLeft: "10px",
          paddingTop: "3px",
          paddingBottom: "3px",
          marginBottom: "5px"
        }}
      >
        {" "}
        Alright, it’s done !{" "}
      </div>

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
          style={{
            width: "90%",
            marginRight: "10px",
            borderRadius: "8px",
            height: "30px",
          }}
          placeholder="  Write a message..."
        />
        <SendHorizontal style={{ fontSize: "24px" }} />{" "}
      </form>
    </div>
  );
}

export default Messager;
