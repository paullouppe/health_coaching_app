import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BodyBoostTitle from '@/components/custom_components/BodyBoostTitle';
import { CircleUserRound, LockKeyhole } from 'lucide-react';

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const password = watch("password");

    const onSubmit = data => {
        return navigate("/patients");
    };

    return (
        <div className="container mx-auto pt-11 px-12 flex flex-col gap-5 items-center">

            <BodyBoostTitle />

            <img className="w-11/12" src="src/assets/track_and_field_undraw.svg" />

            <h1 className="font-semibold text-2xl text-center">Sign up</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <div>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        startIcon={CircleUserRound}
                        {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        startIcon={LockKeyhole}
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Password confirmation"
                        startIcon={LockKeyhole}
                        {...register("confirmPassword", {
                            validate: value =>
                                value === password || "The passwords do not match"
                        })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit">Sign up</Button>

                <span className='text-center text-sm'>
                    You already have an account ? <br/> <span className="underline cursor-pointer text-primary" onClick={() => { return navigate('/signin') }}>Login</span> here !
                </span>
            </form>
        </div>
    );
}

export default Signup
