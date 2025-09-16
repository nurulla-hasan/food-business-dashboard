import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { getInitials } from "@/lib/utils";
import { Camera, ShieldCheck, User2 } from "lucide-react";
import { useRef } from "react";
import { ErrorToast } from "@/lib/utils";
import ProfileSummarySkeleton from "../skeleton/ProfileSummarySkeleton";

const ProfileSummary = ({ previewUrl, onSelectImage, isLoading, isError }) => {
  const admin = useSelector((state) => state.auth.admin);
  const fileInputRef = useRef(null);

  const onPickImage = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const objectUrl = URL.createObjectURL(file);
      onSelectImage?.(file, objectUrl);
    } catch {
      ErrorToast("Failed to select image");
    }
  };
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="p-6 bg-accent/50 dark:bg-accent/30">
          <div className="flex flex-col items-center text-center gap-3">
            {
              isLoading ? (
                <ProfileSummarySkeleton />
              ) : isError ? (
                <p className="text-center text-red-500">Failed to load profile</p>
              ) : (
                <>
                  <div className="relative">
                    <Avatar className="h-20 w-20 border">
                      <AvatarImage src={previewUrl || admin?.profile_image} alt={admin?.name || "User"} />
                      <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      onClick={onPickImage}
                      className="absolute -bottom-1 -right-1 p-1 rounded-full border bg-background shadow cursor-pointer"
                      aria-label="Change profile image"
                      title="Choose profile image"
                    >
                      <Camera size={14} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      className="hidden"
                    />
                    {previewUrl && (
                      <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-base">{admin?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{admin?.email || ""}</p>
                  </div>
                </>
              )
            }
          </div>
        </div>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="border shadow-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <User2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Profile</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Security</p>
                <p className="text-xs text-muted-foreground">Secure</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSummary;
