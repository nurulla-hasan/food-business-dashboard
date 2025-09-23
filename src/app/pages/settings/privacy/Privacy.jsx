import { lazy, Suspense, useMemo } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import JoditEditor from "jodit-react";
import { useEffect, useState, useRef } from "react";
import { useAddPrivacyPolicyMutation, useGetPrivacyPolicyQuery } from "@/redux/feature/legal/legalApi";
import { SuccessToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme-provider";
import Error from "@/components/common/Error";
import { useTranslation } from "react-i18next";
const LegalSkeleton = lazy(()=> import('@/components/legal/LegalSkeleton'));

const Privacy = () => {
    const { t } = useTranslation('legal');
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    const { data: privacyPolicy, isLoading: privacyPolicyLoading, isError: privacyPolicyError } = useGetPrivacyPolicyQuery();

    const [addPrivacyPolicy, { isLoading: addPrivacyPolicyLoading }] = useAddPrivacyPolicyMutation();

    useEffect(() => {
        if (!privacyPolicyLoading && !privacyPolicyError) {
            setContent(privacyPolicy?.data?.description || "");
            setIsLoading(false);
        }
    }, [privacyPolicy, privacyPolicyLoading, privacyPolicyError]);

    const handleSubmit = async () => {
        const res = await addPrivacyPolicy({ description: content });
        if (res?.data?.success) {
            SuccessToast(t('privacy_success'));
        }
    };

    const editorConfig = useMemo(() => {
        let currentTheme = theme;
        if (theme === 'system') {
            currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        return {
            readonly: false,
            height: 650,
            toolbarAdaptive: false,
            toolbarSticky: false,
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,
            placeholder: t('privacy_placeholder'),
            theme: currentTheme,
            buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'link', 'table', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'],
        };
    }, [theme, t]);

    return (
        <Suspense fallback={<LegalSkeleton />}>
            <PageLayout
                pagination={
                    <>
                        {!isLoading && !privacyPolicyError && (
                            <Button
                                disabled={addPrivacyPolicyLoading}
                                loading={addPrivacyPolicyLoading} className="w-24 mx-auto mt-4"
                                onClick={handleSubmit}>
                                {t('save')}
                            </Button>
                        )}
                    </>
                }
            >
                <Title title={t('privacy_policy')} />

                {isLoading ? (
                    <LegalSkeleton />
                ) : privacyPolicyError ? (
                    <Error msg={t('error_generic')}/>
                ) : (
                    <div className="rounded-lg shadow p-4">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                            config={editorConfig}
                        />
                    </div>
                )}
            </PageLayout>
        </Suspense>
    );
};

export default Privacy;