import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Errors(props) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1
        className="font-semibold text-2xl text-center"
        style={{ marginTop: "30%" }}
      >
        Error
      </h1>
      <div className="text-1xl text-center">
        Sorry... this page can not be load.
      </div>

      <img
        src="http://localhost:5173/images/error_image.svg"
        alt="Error Image"
        style={{ width: "70%", marginTop: "50px" }}
      />

      <Button type="submit" style={{ marginTop: "50px" }} onClick={goBack}>
        Back
      </Button>
    </div>
  );
}

export default Errors;
