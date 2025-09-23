import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadCloud, PlusCircle, XCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RangeCalendar } from '@/components/ui/range-calender';

const getFormSchema = (t) => z.object({
  dateRange: z.object({
    from: z.date({ required_error: t('validation.start_date_required') }),
    to: z.date({ required_error: t('validation.end_date_required') }),
  }),
  mealType: z.enum(["Breakfast", "Lunch", "Dinner"], {
    required_error: t('validation.meal_type_required'),
  }),
  image: z.any().refine((file) => file instanceof File, {
    message: t('validation.image_required'),
  }),
  dishName: z.string().min(1, { message: t('validation.dish_name_required') }),
  description: z.string().min(1, { message: t('validation.description_required') }),
  calories: z.coerce.number().positive({ message: t('validation.calories_positive') }),
  price: z.coerce.number().positive({ message: t('validation.price_positive') }),
  nutrition: z.array(z.object({
    name: z.string().min(1, { message: t('validation.nutrient_name_empty') }),
    value: z.coerce.number().positive({ message: t('validation.nutrient_value_positive') })
  })).optional(),
});

const AddMenuModal = ({ isOpen, onOpenChange, onSubmit, loading }) => {
  const { t } = useTranslation('weekly_menu');
  const formSchema = getFormSchema(t);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: { from: undefined, to: undefined },
      mealType: undefined,
      image: undefined,
      dishName: '',
      description: '',
      calories: '',
      price: '',
      nutrition: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nutrition"
  });

  const selectedFile = form.watch('image');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (selectedFile instanceof File) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [selectedFile]);

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }
    
    formData.append('weekStart', formatDate(values.dateRange.from));
    formData.append('weekEnd', formatDate(values.dateRange.to));
    formData.append('mealType', values.mealType);
    formData.append('dishName', values.dishName);
    formData.append('description', values.description);
    formData.append('calories', values.calories);
    formData.append('price', values.price);

    if (values.nutrition && values.nutrition.length > 0) {
        const transformedNutrition = values.nutrition.map(item => {
            if (item.name && item.value) {
                return { [item.name]: item.value };
            }
            return null;
        }).filter(Boolean);

        if (transformedNutrition.length > 0) {
            formData.append('nutrition', JSON.stringify(transformedNutrition));
        }
    }

    await onSubmit(formData);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('add_new_menu')}</DialogTitle>
          <DialogDescription className="sr-only">{t('add_new_menu_desc')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField
                  control={form.control}
                  name="dishName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('dish_name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('placeholders.dish_name')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('description')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('placeholders.description')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('week_availability')}</FormLabel>
                      <FormControl>
                        <RangeCalendar
                          value={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mealType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('meal_type')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('placeholders.select_meal_type')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Breakfast">{t('breakfast')}</SelectItem>
                          <SelectItem value="Lunch">{t('lunch')}</SelectItem>
                          <SelectItem value="Dinner">{t('dinner')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('calories')}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={t('placeholders.calories')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('price')}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={t('placeholders.price')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>{t('additional_nutrition')}</FormLabel>
                  <div className="space-y-3 mt-2">
                    {fields.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start p-2 border rounded-md">
                        <FormField
                          control={form.control}
                          name={`nutrition.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={t('placeholders.nutrient_name')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-start gap-2">
                          <FormField
                            control={form.control}
                            name={`nutrition.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormControl>
                                  <Input type="number" placeholder={t('placeholders.nutrient_value')} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <XCircle />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ name: '', value: '' })}
                    >
                      <PlusCircle/>
                      {t('add_nutrient')}
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t('dish_image')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              onChange(file);
                            }}
                            {...field}
                            value={undefined}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex items-center gap-3 border-2 border-dashed border-muted-foreground/50 rounded-md px-4 py-3 cursor-pointer hover:bg-muted/50 transition min-h-[64px]"
                          >
                            {previewUrl ? (
                              <>
                                <img src={previewUrl} alt={selectedFile?.name} className="h-12 w-12 rounded object-cover" />
                                <div className="flex flex-col items-start">
                                  <span className="text-sm font-medium truncate max-w-[220px]">{selectedFile?.name}</span>
                                  <span className="text-xs text-muted-foreground">{t('image_uploader.change_text')}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <UploadCloud className="h-6 w-6 text-muted-foreground" />
                                <div className="flex flex-col items-start">
                                  <span className="text-sm text-muted-foreground">{t('image_uploader.upload_text')}</span>
                                  <span className="text-xs text-muted-foreground">{t('image_uploader.formats')}</span>
                                </div>
                              </>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={loading} loading={loading}>
                {t('create_menu')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuModal;