import { useState } from "react";
import { Card } from "@/components/ui/card";
import WeightChangeGraph from "../graphs/WeightChangeGraph";
import CaloriesSpentPerActivity from "../graphs/CaloriesSpentPerActivity";
import { ChevronLeft, ChevronRight, Bike, Flame } from 'lucide-react';


function PatientDetailPhysical({ patient, physicalActivities, physiologicalData }) {
    const graphs = [WeightChangeGraph, CaloriesSpentPerActivity];
    const [currentGraph, setCurrentGraph] = useState(0);
    const [graphName, setGraphName] = useState("");

    const newGraphName = (graphName) => {
        setGraphName(graphName);
    }

    const calculateMostPracticedActivity = () => {
        const activityCounts = [
            { type: 'swimming', count: physicalActivities.filter((obj) => obj.type === "swimming").length },
            { type: 'bike', count: physicalActivities.filter((obj) => obj.type === "bike").length },
            { type: 'walking', count: physicalActivities.filter((obj) => obj.type === "walking").length },
            { type: 'footing', count: physicalActivities.filter((obj) => obj.type === "footing").length }
        ];

        const mostPracticed = activityCounts.reduce((max, activity) =>
            activity.count > max.count ? activity : max, activityCounts[0]);

        return mostPracticed.type;
    }

    const renderIcon = () => {
        switch (calculateMostPracticedActivity()) {
            case "swimming":
                return <img src="http://localhost:5173/images/la-natation.svg" />
            case "bike":
                return <Bike color="#3A52ED" />
            case "walking":
                return <img src="http://localhost:5173/images/homme-pieton.svg" />
            case "footing":
                return <img src="http://localhost:5173/images/coureur.svg" />
            default:
                break;
        }
    }

    const calculateCaloriesForGivenActivityName = (activityName) => {
        let calTotal = 0;
        physicalActivities.forEach(activity => {
            if (activity.type == activityName) {
                calTotal += activity.consumedCalories;
            }
        });
        return calTotal;
    }

    const nextGraph = () => {
        setCurrentGraph((prevGraph) => (prevGraph + 1) % graphs.length);
    };

    const previousGraph = () => {
        setCurrentGraph((prevGraph) => (prevGraph - 1 + graphs.length) % graphs.length);
    };

    const renderGraph = (index) => {
        const GraphComponent = graphs[index];
        return <GraphComponent
            patient={patient}
            newGraphName={newGraphName}
            physicalActivities={physicalActivities}
            physiologicalData={physiologicalData} />;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <Card className="w-full pt-2">
                <div className="flex justify-around">
                    <ChevronLeft className="cursor-pointer" onClick={previousGraph} />
                    <span>{graphName}</span>
                    <ChevronRight className="cursor-pointer" onClick={nextGraph} />
                </div>
                {renderGraph(currentGraph)}
            </Card>
            <Card className="w-full px-4 py-3">
                Body mass index <span className="text-[#3A52ED] font-medium">{Math.floor(patient.weightStart / Math.sqrt(patient.height))}</span>
            </Card>
            <Card className="flex flex-col gap-3 w-full px-4 py-5">
                Most practiced activity
                <div className="flex gap-10">
                    <div className="flex gap-2">
                        {renderIcon()}
                        <span className="capitalize">{calculateMostPracticedActivity()}</span>
                    </div>
                    <div className="flex gap-2">
                        <Flame color="#3A52ED" />{calculateCaloriesForGivenActivityName(calculateMostPracticedActivity())} Kcal total
                    </div>
                </div>
            </Card>

        </div>
    );
}

export default PatientDetailPhysical;
