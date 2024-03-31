import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Watch the value of the password field to compare it with the confirmPassword field
    const password = watch("password");

    const onSubmit = data => {
        // No need to check if passwords match here if you're using validation rules
        // as the form won't submit if there are errors
        return navigate("/signin");
    };

    return (
        <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-4">
                <h1 className="font-bold text-2xl">Sign up</h1>
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
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit">Login</Button>

                <Link to={"/signin"}>I already have an account</Link>
            </form>
        </div>
    );
}

export default Signup
