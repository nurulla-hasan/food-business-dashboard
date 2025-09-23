import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

// Schema updated to match the required update body
const getFormSchema = (t) => z.object({
    name: z.string().min(1, { message: t('validation.name_required') }),
    email: z.string().email({ message: t('validation.invalid_email') }),
    phone_number: z.string().min(1, { message: t('validation.phone_required') }),
    address: z.string().min(1, { message: t('validation.address_required') }),
});

const EditCompanyModal = ({ isOpen, onOpenChange, company, onSubmit, loading }) => {
    const { t } = useTranslation('company_management');
    const formSchema = getFormSchema(t);

    const form = useForm({
        resolver: zodResolver(formSchema),
        // Default values match the new schema
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
            address: "",
        },
    });

    useEffect(() => {
        if (company) {
            // Populate form with the correct fields
            form.reset({
                name: company.name,
                email: company.email,
                phone_number: company.phone_number,
                address: company.address,
            });
        }
    }, [company, form]);

    const handleFormSubmit = (values) => {
        // 'values' now has the exact structure needed for the update body
        onSubmit({ ...values, id: company._id });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('edit_company')}</DialogTitle>
                    <DialogDescription className="sr-only">{t('edit_company')}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('name')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('placeholders.name')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('email')}</FormLabel>
                                        <FormControl>
                                            <Input readOnly placeholder={t('placeholders.email')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('phone_number')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('placeholders.phone')} {...field} />
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
                                        <FormLabel>{t('address')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('placeholders.address')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                {t('cancel')}
                            </Button>
                            <Button loading={loading} type="submit" disabled={loading}>
                                {t('update')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCompanyModal;