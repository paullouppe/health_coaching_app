import GoalProgressGraph from "@/components/custom_components/graphs/GoalProgressGraph";
import { Card } from "@/components/ui/card";
import { getPeople, getPhysicalActivitiesByPeopleId, getPhysiologicalDataByPeopleId, getPsychologicalDataByPeopleId } from "@/services/health_api";
import { Cake, ChevronLeft, Goal, Ruler, Weight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [physicalActivities, setPhysicalActivities] = useState({});
    const [physiologicalData, setPhysiologicalData] = useState({});
    const [psychologicalData, setPsychologicalData] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Promise.all([
                    getPeople(),
                    // getPhysicalActivitiesByPeopleId(patientId),
                    // getPhysiologicalDataByPeopleId(patientId),
                    // getPsychologicalDataByPeopleId(patientId),
                ]);
                setPatients(data[0]);
                //   setPhysicalActivities(data[1]);
                //   setPhysiologicalData(data[2]);
                //   setPsychologicalData(data[3]);
            } catch (err) {
                console.error(err);
                setHasErrors(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const meanStartWeight = () => {
        let mean = 0;
        patients.forEach(patient => {
            mean += patient.weightStart;
        });
        return Math.floor(mean / patients.length);
    }

    const meanGoalWeight = () => {
        let mean = 0;
        patients.forEach(patient => {
            mean += patient.weightGoal;
        });
        return Math.floor(mean / patients.length);
    }

    const meanAge = () => {
        let currentYear = new Date().getFullYear();
        let mean = 0;
        patients.forEach(patient => {
            mean += currentYear - patient.birthyear;
        });
        return Math.floor(mean / patients.length);
    }

    const meanHeight = () => {
        let mean = 0;
        patients.forEach(patient => {
            mean += patient.height;
        });
        return Math.floor(mean / patients.length);
    }

    const goPatientList = () => navigate('/patients');

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="absolute top-4 left-2 flex cursor-pointer" onClick={goPatientList}>
                <ChevronLeft /> Back
            </div>

            <div className="font-medium text-2xl mt-10">
                Your profile
            </div>

            <div className="text-sm font-bold text-[#3A52ED]">
                {patients.length} patients
            </div>

            <div className="flex w-full flex-col gap-3 px-3 mt-5">
                <GoalProgressGraph patient={patients} />
                <Card className="w-full p-4 mt-4">
                    <div className="flex gap-2">
                        <Weight size={24} />
                        Mean weight
                        <span className="text-[#3A52ED] font-medium text-lg">{meanStartWeight()}</span>kg
                    </div>
                </Card>

                <Card className="w-full p-4">
                    <div className="flex gap-2">
                        <Goal size={24} />
                        Mean goal 
                        <span className="text-[#3A52ED] font-medium text-lg">{meanGoalWeight()}</span>kg
                    </div>
                </Card>
                <Card className="flex w-full p-4 gap-1">
                    <Cake size={24} className="mr-2" /> Mean age <span className="text-[#3A52ED] font-medium text-lg">{meanAge()}</span>Yo
                </Card>
                <Card className="flex w-full p-4 gap-1">
                    <Ruler size={24} className="mr-2" /> Mean height <span className="text-[#3A52ED] font-medium text-lg">{meanHeight() / 100}</span>m
                </Card>

            </div>
        </div>
    )
}

export default Dashboard;