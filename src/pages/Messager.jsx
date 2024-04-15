import { getPeopleById } from "@/services/health_api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Messager() {
    let { patientId } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Promise.all([
                    getPeopleById(patientId)
                ]);
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


    return (
        <>
            Yo la team je suis {patient.firstname} {patient.lastname}
        </>
    )
}

export default Messager;