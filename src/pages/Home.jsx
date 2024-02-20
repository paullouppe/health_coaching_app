import { useEffect, useState } from "react"
import { getPeople } from "../services/health_api"
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

function Home() {

    const [patients, setPatients] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        getPeople()
            .then((data) => {
                setPatients(data.data);
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

    if(isLoading) {
        return (<div>loading ...</div>)
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <h1 className="text-center text-4xl mt-6 mb-4">Health App</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {patients.map((p,index) => (
                        <div key={index}>
                            <Card className="w-auto h-20 grid grid-cols-2 flex justifiy-evenly pt-5">
                                <img className="ml-4 w-10 h-10" src ="src/assets/react.svg"></img>
                                <Link className="pt-1.5 pl-3" to={"/patient/"+p.id}><span className="uppercase">{p.lastname}</span> {p.firstname}</Link>
                            </Card>
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
