'use client';
import { Suspense, useState } from "react";
import { Card } from "@/components/ui/card";
import ProfileSummary from "@/components/profile/ProfileSummary";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import Title from "@/components/ui/Title";
import { useGetAdminProfileQuery } from "@/redux/feature/auth/authApi";

const Profile = () => {
    const [pendingImage, setPendingImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const { isLoading, isError } = useGetAdminProfileQuery();

    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Profile...</div>}>
            <div className="space-y-4">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <Title title="Admin Profile" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <ProfileSummary
                            pendingImage={pendingImage}
                            previewUrl={previewUrl}
                            isLoading={isLoading}
                            isError={isError}
                            onSelectImage={(file, preview) => {
                                setPendingImage(file);
                                setPreviewUrl(preview);
                            }}
                            onClearPending={() => {
                                if (previewUrl) URL.revokeObjectURL(previewUrl);
                                setPendingImage(null);
                                setPreviewUrl(null);
                            }}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8">
                        <Card>
                            <Tabs defaultValue="profile" className="w-full">
                                <div className="px-4 pt-4">
                                    <TabsList className="flex gap-2">
                                        <TabsTrigger value="profile">Edit Profile</TabsTrigger>
                                        <TabsTrigger value="password">Change Password</TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <TabsContent value="profile">
                                        <EditProfileForm
                                            pendingImage={pendingImage}
                                            isLoading={isLoading}
                                            isError={isError}
                                            onClearPending={() => {
                                                if (previewUrl) URL.revokeObjectURL(previewUrl);
                                                setPendingImage(null);
                                                setPreviewUrl(null);
                                            }}
                                        />
                                    </TabsContent>
                                    <TabsContent value="password">
                                        <ChangePasswordForm />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </Card>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Profile;