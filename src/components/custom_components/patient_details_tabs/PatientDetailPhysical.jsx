import { useState } from "react";
import { Card } from "@/components/ui/card";
import WeightChangeGraph from "../graphs/WeightChangeGraph";
import TimeSpentPerActivity from "../graphs/TimeSpentPerActivity";
import { ChevronLeft, ChevronRight } from 'lucide-react';


function PatientDetailPhysical({ patient }) {
    const graphs = [WeightChangeGraph, TimeSpentPerActivity, TimeSpentPerActivity];
    const [currentGraph, setCurrentGraph] = useState(0);

    const nextGraph = () => {
        setCurrentGraph((prevGraph) => (prevGraph + 1) % graphs.length);
    };

    const previousGraph = () => {
        setCurrentGraph((prevGraph) => (prevGraph - 1 + graphs.length) % graphs.length);
    };

    const renderGraph = (index) => {
        const GraphComponent = graphs[index];
        return <GraphComponent patient={patient} />;
    };

    return (
        <div className="flex flex-col items-center">
            <div>Patient detail physical</div>
            <Card className="w-4/5 relative">
                <div className="flex justify-around">
                    <ChevronLeft className="cursor-pointer" onClick={nextGraph}/>
                    <span>Nom du graph</span>
                    <ChevronRight className="cursor-pointer" onClick={nextGraph}/>
                </div>
                {renderGraph(currentGraph)}
            </Card>

        </div>
    );
}

export default PatientDetailPhysical;
