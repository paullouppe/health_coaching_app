import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';


function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();

    const onSubmit = data => {
      const token = 'YOUR_JWT_TOKEN';
      Cookies.set('token', token, { expires: 7, secure: true });

      return navigate("/");
    };

    return (
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Login</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button type="submit">Login</Button>

          <Link to={"/signup"}>I don't have an account</Link>
        </form>
      </div>
    );
}

export default Signin
