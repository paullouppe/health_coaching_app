import { Weight, Goal, Cake, Activity, Ruler } from "lucide-react";
import GoalProgressGraph from "../graphs/GoalProgressGraph";

function PatientDetailPersonal({ patient }) {
  return (
    <>
      <div className="container mx-auto px-1">
        <div className="flex justify-center w-full mb-6">
          <GoalProgressGraph patient={patient} />
        </div>

        <div className="flex gap-10">
          <div className="w-1/2 bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Weight />
              <span className="ml-2">Weight</span>
            </div>
            <div className="flex justify-center w-full mt-2">
              <span className="text-[#3A52ED] font-medium text-lg">{patient.weightStart}</span>kg
            </div>
          </div>

          <div className="w-1/2 bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Goal />
              <span className="ml-2">Goal</span>
            </div>
            <div className="flex justify-center w-full mt-2">
              <span className="text-[#3A52ED] font-medium text-lg">{patient.weightGoal}</span>kg
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <div className="bg-white rounded-lg shadow p-4 h-15">
            <div className="flex items-center">
              <Cake />
              <span className="ml-4">
                <span className="text-[#3A52ED] font-medium text-lg">{new Date().getFullYear() - patient.birthyear}</span> years old
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 h-15">
            <div className="flex items-center">
              <Ruler />
              <span className="ml-4">
                <span className="text-[#3A52ED] font-medium text-lg">{(patient.height / 100).toFixed(2)}</span> meters
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 h-15">
            <div className="flex items-center">
              <Activity />
              <span className="ml-4">
                Start BMI : <span className="text-[#3A52ED] font-medium">{patient.bmiStart}</span> 
                <br />
                Objective : <span className="text-[#3A52ED] font-medium">{patient.bmiGoal}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDetailPersonal;
