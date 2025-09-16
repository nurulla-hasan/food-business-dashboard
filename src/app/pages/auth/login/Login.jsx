import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/feature/auth/authApi";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const [login, {isLoading}] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        login(data)
    };

    return (
        <div className="w-full max-w-sm md:max-w-lg">
            <Card className="overflow-hidden p-0">
                <CardContent className="p-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <Link to="/">
                            <ArrowLeft className="cursor-pointer" />
                        </Link>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-semibold text-title">Welcome back</h1>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-400 text-sm ml-0.5 -mt-1">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="********"
                                        {...register("password")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="text-red-400 text-sm ml-0.5 -mt-1">{errors.password.message}</span>
                                )}
                            </div>

                            <Button loading={isLoading} type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        {/* <div className="text-center text-sm mt-6">
                                Don&apos;t have an account?{" "}
                                <Link to="/auth/sign-up" className="text-primary">
                                    Sign up
                                </Link>
                            </div> */}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm;