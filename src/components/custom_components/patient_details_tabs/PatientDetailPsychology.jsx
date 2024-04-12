import { Card } from "@/components/ui/card";
import PatientMentalStateEvolution from "../graphs/PatientMentalStateEvolution";
import { useMemo } from "react";

function PatientDetailPsychology({ patient, psychologicalData }) {

    const mostCommonMood = useMemo(() => {
        const moodCount = [
            { type: 'addicted', count: psychologicalData.filter((obj) => obj.type === "addicted").length },
            { type: 'enduring', count: psychologicalData.filter((obj) => obj.type === "enduring").length },
            { type: 'motivated', count: psychologicalData.filter((obj) => obj.type === "motivated").length },
            { type: 'losing motivation', count: psychologicalData.filter((obj) => obj.type === "losing motivation").length },
            { type: 'lazy', count: psychologicalData.filter((obj) => obj.type === "lazy").length },
            { type: 'hopeless', count: psychologicalData.filter((obj) => obj.type === "hopeless").length }
        ];

        const mostPracticed = moodCount.reduce((max, activity) =>
            activity.count > max.count ? activity : max, moodCount[0]);

        return mostPracticed.type;
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">

            <Card className="w-full">
                <PatientMentalStateEvolution patient={patient} psychologicalData={psychologicalData}/>
            </Card>
            <Card className="w-full px-4 py-3">
                Latest mood <span className="text-[#3A52ED] font-medium">enduring</span>
            </Card>
        </div>
    )
}

export default PatientDetailPsychology;
