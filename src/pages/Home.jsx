import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BodyBoostTitle from "@/components/custom_components/BodyBoostTitle";

function Home() {
  const navigate = useNavigate();

  const goSignUp = () => {
    return navigate("/signup");
  };

  const goSignIn = () => {
    return navigate("/signin");
  };

  return (
    <>
      <div className="container mx-auto pt-11 md:w-2/5 md:mt-20 px-4">
        <header className="flex items-center mt-5 mb-5">
          <div>
            <img className="w-10 h-10" src="./public/logo_app.png" />
            <br />
            <BodyBoostTitle />
          </div>
        </header>

        <h1 className="text-left text-4xl">
          The best <br /> coaching app on <br /> the market
        </h1>
        <h2>
          <br />A powerful tool that can help you and <br />
          your client focus on your goals
        </h2>

        <br />

        <div className="flex gap-2">
          <Button
            onClick={goSignUp}
            style={{ backgroundColor: "#7C3AED" }}
            className="w-1/2"
          >
            Sign up !
          </Button>
          <Button
            onClick={goSignIn}
            style={{
              backgroundColor: "white",
              borderColor: "#DFE5EE",
              borderWidth: ".1px",
              color: "black",
            }}
            className="w-1/2"
          >
            Login
          </Button>
        </div>

        <div className="mx-auto mt-8">
          <img src="src/assets/home_img.svg" className="w-full" />
        </div>
      </div>
    </>
  );
}

export default Home;
