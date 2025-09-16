import { lazy, Suspense, useMemo } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import JoditEditor from "jodit-react";
import { useEffect, useState, useRef } from "react";
import { useAddAboutMutation, useGetAboutQuery } from "@/redux/feature/legal/legalApi";
import { SuccessToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme-provider";
import Error from "@/components/common/Error";
const LegalSkeleton = lazy(()=> import('@/components/legal/LegalSkeleton'));

const About = () => {
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    const { data: about, isLoading: aboutLoading, isError: aboutError } = useGetAboutQuery();

    const [addAbout, { isLoading: addAboutLoading }] = useAddAboutMutation();

    useEffect(() => {
        if (!aboutLoading && !aboutError) {
            setContent(about?.data?.description || "");
            setIsLoading(false);
        }
    }, [about, aboutLoading, aboutError]);

    const handleSubmit = async () => {
        const res = await addAbout({ description: content });
        if (res?.data?.success) {
            SuccessToast("About updated successfully");
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
            placeholder: "Write your About here...",
            theme: currentTheme,
            buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'link', 'table', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'],
        };
    }, [theme]);

    return (
        <Suspense fallback={<LegalSkeleton />}>
            <PageLayout
                pagination={
                    <>
                        {!isLoading && !aboutError && (
                            <Button
                                disabled={addAboutLoading}
                                loading={addAboutLoading} className="w-24 mx-auto mt-4"
                                onClick={handleSubmit}>
                                Save
                            </Button>
                        )}
                    </>
                }
            >
                <Title title="About Us" />

                {isLoading ? (
                    <LegalSkeleton />
                ) : aboutError ? (
                    <Error msg="Something went wrong"/>
                ) : (
                    <div className="rounded-lg shadow p-4">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onBlur={(newContent) => setContent(newContent)}
                            config={editorConfig}
                        />
                    </div>
                )}
            </PageLayout>
        </Suspense>
    );
};

export default About;