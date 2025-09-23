import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

const getFormSchema = (t) => z.object({
    name: z.string().min(1, { message: t('validation.name_required') }),
    email: z.string().email({ message: t('validation.invalid_email') }),
    phone_number: z.string().min(1, { message: t('validation.phone_required') }),
    address: z.string().min(1, { message: t('validation.address_required') }),
    password: z.string().min(8, { message: t('validation.password_min_length') }),
    confirmPassword: z.string().min(8, { message: t('validation.password_min_length') }),
    plants: z.coerce.number().int().positive({ message: t('validation.plants_positive') }),
}).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwords_no_match'),
    path: ["confirmPassword"],
});


const AddCompanyModal = ({ isOpen, onOpenChange, onSubmit, loading }) => {
    const { t } = useTranslation('company_management');
    const formSchema = getFormSchema(t);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            address: '',
            password: '',
            confirmPassword: '',
            plants: '',
        },
    });

    const handleFormSubmit = async (values) => {
        await onSubmit(values);
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('add_company')}</DialogTitle>
                    <DialogDescription className="sr-only">{t('add_company')}</DialogDescription>
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
                                            <Input type="email" placeholder={t('placeholders.email')} {...field} />
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
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('password')}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder={t('placeholders.password')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('confirm_password')}</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder={t('placeholders.password')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="plants"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('number_of_plants')}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder={t('placeholders.plants')} {...field} />
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
                                {t('create_company')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCompanyModal;
