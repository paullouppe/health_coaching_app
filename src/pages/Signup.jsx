import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BodyBoostTitle from '@/components/custom_components/BodyBoostTitle';

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = watch("password");

    const onSubmit = data => {
        return navigate("/patients");
    };

    return (
        <div className="container mx-auto pt-11 md:w-2/5 md:mt-20 px-4">
            <BodyBoostTitle />
            <img src="src/assets/track_and_field_undraw.svg" />
            <h1 className="font-bold text-2xl">Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-4">
                <div>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
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
                <div>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Password confirmation"
                        {...register("confirmPassword", {
                            validate: value =>
                                value === password || "The passwords do not match"
                        })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit">Sign up</Button>

                <span className='text-center'>
                    You already have an account ? <br/> <span className="underline" onClick={() => { return navigate('/signin') }}>Login</span> here !
                </span>
            </form>
        </div>
    );
}

export default Signup
