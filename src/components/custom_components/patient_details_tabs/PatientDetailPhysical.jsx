import { useState } from "react";
import { Card } from "@/components/ui/card";
import WeightChangeGraph from "../graphs/WeightChangeGraph";
import CaloriesSpentPerActivity from "../graphs/CaloriesSpentPerActivity";
import { ChevronLeft, ChevronRight } from 'lucide-react';


function PatientDetailPhysical({ patient, physicalActivities }) {
    const graphs = [WeightChangeGraph, CaloriesSpentPerActivity];
    const [currentGraph, setCurrentGraph] = useState(0);
    const [graphName, setGraphName] = useState("");

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

    const calculateCaloriesForGivenActivityName = (activityName) => {
        console.log(physicalActivities);
        let calTotal = 0;
        physicalActivities.forEach(activity => {
            if(activity.type == activityName){
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
        return <GraphComponent patient={patient} setGraphName={setGraphName} physicalActivities={physicalActivities} />;
    };

    return (
        <div className="flex flex-col items-center">
            <div>Patient detail physical</div>
            <Card className="w-4/5 relative">
                <div className="flex justify-around">
                    <ChevronLeft className="cursor-pointer" onClick={previousGraph}/>
                    <span>{graphName}</span>
                    <ChevronRight className="cursor-pointer" onClick={nextGraph}/>
                </div>
                {renderGraph(currentGraph)}
            </Card>
            <Card className="w-4/5 relative">
                Body mass index {Math.floor(patient.weightStart / Math.sqrt(patient.height))}
            </Card>
            <Card className="w-4/5 relative">
                Most practiced activity
                <div className="flex">
                    <span className="capitalize">{calculateMostPracticedActivity()}</span> {calculateCaloriesForGivenActivityName(calculateMostPracticedActivity())}Kcal total
                </div>
            </Card>

        </div>
    );
}

export default PatientDetailPhysical;
