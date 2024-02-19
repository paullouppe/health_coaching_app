import { useState, useEffect } from 'react';
import { getPeopleById } from '@/services/health_api';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Patient() {
    let { patientId } = useParams();

    const [patient, setPatient] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getPeopleById(patientId)
            .then((data) => {
                setPatient(data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.error(err);
                setHasErrors(true);
            });
    }, []);

    if (hasErrors) {
        return (<div>Errors</div>)
    }

    if (isLoading) {
        return (<div>Loading ...</div>)
    }

    return (
        <div className="text-center">
            <div>
                <span className="uppercase">{patient.lastname}</span> {patient.firstname}
            </div>
            <div>sexe : {(patient.sex === 1) ? "Homme" : "Femme"}</div>
            <div>taille : {patient.height}</div>
            <div>poids : {patient.weightStart}</div>
            <div>objectif : {patient.weightGoal}</div>
            <Button>
                <Link to={"/"}>Retour</Link>
            </Button>
        </div>
    )
}

export default Patient
