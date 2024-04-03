import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const goSignUp  = () => {
      return navigate("/signup");
    }

    const goSignIn  = () => {
      return navigate("/signin");
    }

    return (
      <>
          <div className="container mx-auto px-4">
            C'est ici que l'on code la page home (Home-Screen sur Figma)
          </div>
          <Button onClick={goSignUp}>Sign up !</Button>
          <Button onClick={goSignIn}>Login</Button>
      </>
    )
}

export default Home
