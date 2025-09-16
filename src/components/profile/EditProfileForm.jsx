"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Lock, ShieldCheck, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUpdateAdminProfileMutation } from "@/redux/feature/auth/authApi";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import EditProfileSkeleton from "../skeleton/EditProfileSkeleton";
import Error from "../common/Error";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  email: z.string().email(),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .refine((v) => !v || v.length > 10, {
      message: "Phone number must be longer than 10 characters",
    }),
  address: z
    .string()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
});

const EditProfileForm = ({ pendingImage, onClearPending, isLoading, isError }) => {
  const admin = useSelector((state) => state.auth.admin);
  const [updateProfile, { isLoading: updateLoading }] = useUpdateAdminProfileMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: admin?.name || "",
      email: admin?.email || "",
      phone: admin?.contact || "",
      address: admin?.address || "",
    },
  });

  useEffect(() => {
    if (admin) {
      form.reset({
        name: admin?.name || "",
        email: admin?.email || "",
        phone: admin?.contact || "",
        address: admin?.address || "",
      });
    }
  }, [admin, form]);

  const onSubmit = async (values) => {
    try {
      if (pendingImage) {
        const formData = new FormData();
        formData.append("profile_image", pendingImage);
        formData.append(
          "data",
          JSON.stringify({
            name: values.name,
            contact: values.phone,
            address: values.address,
          })
        );
        await updateProfile(formData).unwrap();
        onClearPending?.();
      } else {
        const payload = {
          name: values.name,
          contact: values.phone,
          address: values.address,
        };
        await updateProfile(payload).unwrap();
      }
      SuccessToast("Profile updated successfully");
      form.reset({ ...values });
    } catch (err) {
      const msg = err?.data?.message || "Failed to update profile";
      ErrorToast(msg);
    }
  };

  return (
    isLoading ? (
      <EditProfileSkeleton />
    ) : isError ? (
      <Error msg="Failed to load profile" />
    ) : (
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                    <User2 size={14} />
                  </div>
                  <h3 className="text-sm font-semibold">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {pendingImage && (
                    <div className="text-xs rounded border px-3 py-2 bg-amber-500/20 text-muted-foreground">
                      New profile image selected. It will be uploaded when you click &quot;Save Changes&quot;.
                      <button type="button" className="ml-2 underline" onClick={() => onClearPending?.()}>Clear</button>
                    </div>
                  )}
                </div>
              </section>

              <Separator />

              {/* Email Address */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                    <Lock size={14} />
                  </div>
                  <h3 className="text-sm font-semibold">Email Address</h3>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <Separator />

              {/* Contact Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full border grid place-items-center bg-primary/10 text-primary">
                    <ShieldCheck size={14} />
                  </div>
                  <h3 className="text-sm font-semibold">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <div className="pt-2">
                <Button loading={updateLoading} className="w-full" type="submit" disabled={updateLoading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  );
};

export default EditProfileForm;