import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

function PatientCard({ patientData }) {

    let loading = (patientData) ? false : true;

    if (loading) {
      return (
        <Card className="flex items-center">
            <Skeleton className="ml-4 w-10 h-10 rounded-full"/>
            <CardHeader>
                <Skeleton className="w-40 h-5"/>
                <Skeleton className="w-14 h-5 mt-1"/>
            </CardHeader>
        </Card>
      )
    }
    return  (
        <Link to={"/patient/" + patientData.id}>
            <Card className="flex items-center flex-col">
                <img className="w-16 h-16 mt-5" src={patientData.icon}/>
                <CardHeader className="mt-0">
                    <CardTitle className="text-center">
                        <div className="uppercase">{patientData.lastname}</div> {patientData.firstname}
                    </CardTitle>
                    <CardDescription className="text-center">
                        <Badge className="capitalize text-neutral-500" variant="secondary">{patientData.activityProfile}</Badge>
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default PatientCard
