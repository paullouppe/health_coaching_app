import { useState, useEffect } from 'react';
import { getPeopleById } from '@/services/health_api';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Errors from './functional_pages/Errors'

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
        return (<Errors/>);
    }

    if (isLoading) {
        return (<div>Loading ...</div>)
    }

    return (
        <div className="text-center">
            <img className="ml-4 w-20 h-20" src={"../"+patient.icon}/>
            <div>
                <span className="uppercase">{patient.lastname}</span> {patient.firstname}
            </div>
            <div>Sex : {(patient.sex === 1) ? "Man" : "Woman"}</div>
            <div>Height : {patient.height}</div>
            <div>Weight : {patient.weightStart}</div>
            <div>Weight Goal : {patient.weightGoal}</div>
            <Link to={"/"}>
                <Button>Retour</Button>
            </Link>
        </div>
    )
}

export default Patient
