import { useState } from "react";
import { Card } from "@/components/ui/card";
import WeightChangeGraph from "../graphs/WeightChangeGraph";
import CaloriesSpentPerActivity from "../graphs/CaloriesSpentPerActivity";
import { ChevronLeft, ChevronRight } from 'lucide-react';


function PatientDetailPhysical({ patient, physicalActivities }) {
    const graphs = [WeightChangeGraph, CaloriesSpentPerActivity];
    const [currentGraph, setCurrentGraph] = useState(0);
    const [graphName, setGraphName] = useState("");

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
                    <ChevronLeft className="cursor-pointer" onClick={nextGraph}/>
                    <span>{graphName}</span>
                    <ChevronRight className="cursor-pointer" onClick={nextGraph}/>
                </div>
                {renderGraph(currentGraph)}
            </Card>
            <Card className="w-4/5 relative">
                Body mass index
            </Card>
            <Card className="w-4/5 relative">
                Most practiced activity
                <div className="flex">
                    Bike 3500Kcal total
                </div>
            </Card>

        </div>
    );
}

export default PatientDetailPhysical;
