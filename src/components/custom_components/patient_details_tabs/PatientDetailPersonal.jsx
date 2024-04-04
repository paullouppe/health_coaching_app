function PatientDetailPersonal({ data }) {
  return (
    <>
      
      <div className="container mx-auto pt-11 md:w-2/5 md:mt-20 px-4 ">
      
        
        <div className="flex gap-10 ">
          <div
            style={{
              height: "100px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
            }}
            className="w-1/2"
          >
            <img src="src/assets/weight.svg" />
            Weight
          </div>

          <div
            style={{
              height: "100px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
            }}
            className="w-1/2"
          >
            <img src="src/assets/goal.svg" />
            Goal
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div
            style={{
              width: "100%", // Prend toute la largeur disponible
              height: "65px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "20px", // Espacement supplémentaire en haut
              marginBottom: "7px", // Espacement supplémentaire en bas
            }}
          >
            Years Old
          </div>

          <div
            style={{
              width: "100%", // Prend toute la largeur disponible
              height: "65px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "7px", // Espacement supplémentaire en haut
              marginBottom: "7px", // Espacement supplémentaire en bas
            }}
          >
            Meters
          </div>

          <div
            style={{
              width: "100%", // Prend toute la largeur disponible
              height: "65px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "7px", // Espacement supplémentaire en haut
            }}
          >
            Somewhat Active
          </div>
        </div>
      </div>
      
    </>
  );
}

export default PatientDetailPersonal;
