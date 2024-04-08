import { Card, CardHeader } from "@/components/ui/card"
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

function PatientCard({ patientData }) {

    let loading = (patientData) ? false : true; //no data provided = tile loading

    if (loading) {
        return (
            <Card className="flex items-center flex-col">
                <Skeleton className="w-16 h-16 mt-3 rounded-full" />
                <Skeleton className="w-20 h-8 mt-3" />
                <div className="mt-1 mb-3">
                    <Skeleton className="w-16 h-5 mt-3" />
                </div>
            </Card>
        )
    }
    return (
        <Link to={"/patient/" + patientData.id}>
            <Card className="flex items-center flex-col">
                <img className="w-16 h-16 mt-3" src={patientData.icon} />
                <div className="mt-1">
                    <div className="text-center font-medium">
                        <div className="uppercase">{patientData.lastname}</div> {patientData.firstname}
                    </div>
                    <div className="text-center mt-1 mb-3">
                        <Badge className="capitalize text-neutral-500" variant="secondary">{patientData.activityProfile}</Badge>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default PatientCard;
