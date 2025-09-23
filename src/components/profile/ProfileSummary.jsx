import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { getImageUrl, getInitials } from "@/lib/utils";
import { Camera, ShieldCheck, User2 } from "lucide-react";
import { useRef } from "react";
import { ErrorToast } from "@/lib/utils";
import ProfileSummarySkeleton from "../skeleton/ProfileSummarySkeleton";
import { useTranslation } from "react-i18next";

const ProfileSummary = ({ previewUrl, onSelectImage, isLoading, isError }) => {
  const { t } = useTranslation('profile');
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
      ErrorToast(t('summary.toast.select_fail'));
    }
  };
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden py-0">
        <div className="p-6 bg-accent/50 dark:bg-accent/30">
          <div className="flex flex-col items-center text-center gap-3">
            {
              isLoading ? (
                <ProfileSummarySkeleton />
              ) : isError ? (
                <p className="text-center text-red-500">{t('summary.error_load')}</p>
              ) : (
                <>
                  <div className="relative">
                    <Avatar className="h-20 w-20 border">
                      <AvatarImage src={previewUrl || getImageUrl(admin?.profile_image)} alt={admin?.name || t('summary.user_fallback')} />
                      <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      onClick={onPickImage}
                      className="absolute -bottom-1 -right-1 p-1 rounded-full border bg-background shadow cursor-pointer"
                      aria-label={t('summary.change_image_aria')}
                      title={t('summary.choose_image_title')}
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
                        {t('summary.pending')}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-base">{admin?.name || t('summary.user_fallback')}</p>
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
                <p className="text-sm font-medium">{t('summary.profile_card')}</p>
                <p className="text-xs text-muted-foreground">{t('summary.complete')}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-none">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border grid place-items-center bg-primary/10 text-primary">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">{t('summary.security_card')}</p>
                <p className="text-xs text-muted-foreground">{t('summary.secure')}</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSummary;
