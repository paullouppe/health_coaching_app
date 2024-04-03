import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = watch("password");

    const onSubmit = data => {
        return navigate("/patients");
    };

    return (
      <div className="container mx-auto md:w-2/5 md:mt-20 px-4">
         <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-4">
             <h1 className="font-bold text-2xl">Sign up</h1>
             <div>
                 <label htmlFor="email">Email:</label>
                 <Input
                     id="email"
                     type="email"
                     {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                 />
                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
             </div>
             <div>
                 <label htmlFor="password">Password:</label>
                 <Input
                     id="password"
                     type="password"
                     {...register("password", { required: "Password is required" })}
                 />
                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
             </div>
             <div>
                 <label htmlFor="confirmPassword">Confirm Password:</label>
                 <Input
                     id="confirmPassword"
                     type="password"
                     {...register("confirmPassword", {
                         validate: value =>
                             value === password || "The passwords do not match"
                     })}
                 />
                 {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
             </div>

             <Button type="submit">Sign up</Button>


             <Button variant="secondary"><Link to={"/signin"}>I already have an account</Link></Button>

         </form>
     </div>
    );
}

export default Signup
