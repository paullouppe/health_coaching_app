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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

    if (isLoading) {
        return (
          <div className="h-screen flex items-center justify-center">
            Loading ...
          </div>)
    }

    return (
        <>
            <div className="container mx-auto px-4">
                <header className="flex items-centerd mt-10 mb-10">
                    <img className="w-10 h-10" src="./public/logo_app.png"></img>
                    <h1 className="text-center text-4xl ml-3">Body Boost</h1>
                </header>
                <div className="flex w-full max-w-sm items-center space-x-2 mb-5">
                    <Input type="search" placeholder="Search..." />
                    <Button type="submit">
                        <img src="src/assets/search_logo.png"></img>
                    </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {patients.map((p, index) => (
                        <div key={index}>
                            <Link to={"/patient/" + p.id}>
                                <Card className="flex items-center transition-transform active:scale-95">
                                    <img className="ml-4 w-10 h-10" src={p.icon}></img>
                                    <CardHeader>
                                        <CardTitle><span className="uppercase">{p.lastname}</span> {p.firstname}</CardTitle>
                                        <CardDescription>
                                            <Badge className="capitalize text-neutral-500	" variant="secondary">{p.activityProfile}</Badge>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
