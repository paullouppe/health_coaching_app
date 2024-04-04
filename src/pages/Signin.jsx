import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BodyBoostTitle from '@/components/custom_components/BodyBoostTitle';
import { CircleUserRound } from 'lucide-react';


function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();

  const onSubmit = data => {
    const token = 'YOUR_JWT_TOKEN';
    Cookies.set('token', token, { expires: 7, secure: true });

    return navigate("/patients");
  };

  return (
    <div className="container mx-auto pt-11 md:w-2/5 md:mt-20 px-4">
      <BodyBoostTitle/>
      <img src="src/assets/golf_man_undraw.svg"/>
      <h1 className="font-bold text-2xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-4">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            icon={CircleUserRound}
            {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <Button type="submit">Login</Button>
        <span className='text-center'>
          No account ? <span className="underline" onClick={() => { return navigate('/signup') }}>Sign up</span> for free !
        </span>
      </form>
    </div>
  );
}

export default Signin
