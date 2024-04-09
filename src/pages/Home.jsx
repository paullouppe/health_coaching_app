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
      <div className="container mx-auto md:w-2/5 md:mt-20 px-8">
        <header className="flex items-center mt-5 mb-5">
          <img className="w-7 h-7 mr-2" src="http://localhost:5173/images/logo_app.png" />
          <BodyBoostTitle />
        </header>

        <h1 className="text-left text-3xl font-medium mb-3">
          The best coaching app on the market
        </h1>
        <h2>
          A powerful tool that can help you and <br />
          your client focus on your goals
        </h2>


        <div className="flex mt-6 gap-4">
          <Button
            onClick={goSignUp}
            className="w-1/2"
          >
            Sign up !
          </Button>
          <Button
            onClick={goSignIn}
            variant="outline"
            className="w-1/2"
          >
            Login
          </Button>
        </div>

        <div className="mx-auto mt-8 mb-4">
          <img src="http://localhost:5173/images/home_img.svg" className="w-full" />
        </div>
      </div>
    </>
  );
}

export default Home;
