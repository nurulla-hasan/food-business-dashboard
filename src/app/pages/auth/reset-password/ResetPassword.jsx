import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useResetPasswordMutation } from "@/redux/feature/auth/authApi";

const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
    confirmNewPassword: z.string().min(6, { message: "Confirm new password must be at least 6 characters." }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match.",
    path: ["confirmNewPassword"],
});

const ResetPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);
    const FPE = typeof window !== "undefined" ? localStorage.getItem("FPE") : null;

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        resetPassword(
            {
                email: FPE,
                newPassword: data.newPassword,
                confirmPassword: data.confirmNewPassword
            })
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
                                <h1 className="text-2xl font-semibold text-title">Reset Your Password</h1>
                                <p className="text-sm text-subtitle">Enter your new password below.</p>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="********"
                                        {...register("newPassword")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                                        onClick={toggleNewPasswordVisibility}
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-400 text-sm ml-0.5 -mt-1">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmNewPassword"
                                        type={showConfirmNewPassword ? "text" : "password"}
                                        placeholder="********"
                                        {...register("confirmNewPassword")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                                        onClick={toggleConfirmNewPasswordVisibility}
                                    >
                                        {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmNewPassword && (
                                    <p className="text-red-400 text-sm ml-0.5 -mt-1">{errors.confirmNewPassword.message}</p>
                                )}
                            </div>

                            <Button loading={isLoading} type="submit" className="w-full">
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPassword;
