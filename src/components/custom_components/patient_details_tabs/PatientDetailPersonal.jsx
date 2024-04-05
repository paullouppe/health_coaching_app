import { Weight, Goal, Cake, Activity, Ruler } from "lucide-react";

function PatientDetailPersonal({ data }) {
  return (
    <>
      <div className="container mx-auto px-1">
        <div className="flex justify-center w-full">graphique</div>
        <br></br>

        <div className="flex gap-10 ">
          <div
            style={{
              height: "90px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
            }}
            className="w-1/2"
          >
            <div class="flex items-center ml-4 mt-4">
              <Weight />
              <span class="ml-2">Weight</span>       
            </div>

            <div className="flex justify-center w-full mt-2">
              kg
            </div>
            
          </div>

          <div
            style={{
              height: "90px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
            }}
            className="w-1/2"
          >
            <div class="flex items-center ml-4 mt-4">
              <Goal />
              <span class="ml-2">Goal</span>       
            </div>

            <div className="flex justify-center w-full mt-2">
              kg
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
              marginBottom: "7px",
            }}
          >
           <div class="flex items-center ml-4 mt-4">
              <Cake />
              <span class="ml-4">years old</span>       
            </div>

            
          </div>

          <div
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "7px",
              marginBottom: "7px",
            }}
          >
           <div class="flex items-center ml-4 mt-4">
              <Ruler />
              <span class="ml-4">meters</span>       
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "7px",
            }}
          >
            <div class="flex items-center ml-4 mt-4">
              <Activity />
              <span class="ml-4">Activity</span>       
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDetailPersonal;
