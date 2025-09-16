import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import { Suspense } from "react";

const Contact = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Contact...</div>}>
            <PageLayout>
                <Title title="Contact" />
            </PageLayout>
        </Suspense>
    );
};

export default Contact;