import { lazy, Suspense, useMemo } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import JoditEditor from "jodit-react";
import { useEffect, useState, useRef } from "react";
import { useAddTermsMutation, useGetTermsQuery } from "@/redux/feature/legal/legalApi";
import { SuccessToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme-provider";
import Error from "@/components/common/Error";
import { useTranslation } from "react-i18next";
const LegalSkeleton = lazy(()=> import('@/components/legal/LegalSkeleton'));

const Terms = () => {
    const { t } = useTranslation('legal');
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    const { data: terms, isLoading: termsLoading, isError: termsError } = useGetTermsQuery();

    const [addTerms, { isLoading: addTermsLoading }] = useAddTermsMutation();

    useEffect(() => {
        if (!termsLoading && !termsError) {
            setContent(terms?.data?.description || "");
            setIsLoading(false);
        }
    }, [terms, termsLoading, termsError]);

    const handleSubmit = async () => {
        const res = await addTerms({ description: content });
        if (res?.data?.success) {
            SuccessToast(t('terms_success'));
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
            placeholder: t('terms_placeholder'),
            theme: currentTheme,
            buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'link', 'table', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'],
        };
    }, [theme, t]);

    return (
        <Suspense fallback={<LegalSkeleton />}>
            <PageLayout
                pagination={
                    <>
                        {!isLoading && !termsError && (
                            <Button
                                disabled={addTermsLoading}
                                loading={addTermsLoading} className="w-24 mx-auto mt-4"
                                onClick={handleSubmit}>
                                {t('save')}
                            </Button>
                        )}
                    </>
                }
            >
                <Title title={t('terms')} />

                {isLoading ? (
                    <LegalSkeleton />
                ) : termsError ? (
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

export default Terms;