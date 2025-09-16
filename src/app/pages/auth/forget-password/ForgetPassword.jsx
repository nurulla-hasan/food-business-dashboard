import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "@/redux/feature/auth/authApi";
import { useEffect } from "react";

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
});

const ForgetPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
    });

    const [forgetPassword, { isSuccess, isLoading }] = useForgetPasswordMutation()
    
    useEffect(() => {
        if (isSuccess) {
            navigate("/auth/verify-otp")
        }
    }, [isSuccess, navigate])


    const onSubmit = (data) => {
        forgetPassword(data)
    };

    return (
        <div className="w-full max-w-sm md:max-w-lg">
            <Card className="overflow-hidden p-0">
                <CardContent className="p-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <Link to="/auth/login">
                            <ArrowLeft className="cursor-pointer" />
                        </Link>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-semibold text-title mb-2">Forgot Your Password?</h1>
                                <p className="text-sm text-subtitle">Enter your email to reset your password.</p>
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

                            <Button loading={isLoading} type="submit" className="w-full">
                                Get Code
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgetPassword;