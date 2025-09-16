import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadCloud, PlusCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RangeCalendar } from '@/components/ui/range-calender';
import { getImageUrl } from '@/lib/utils';

const formSchema = z.object({
  dateRange: z.object({
    from: z.date({ required_error: "A start date is required." }),
    to: z.date({ required_error: "An end date is required." }),
  }),
  mealType: z.enum(["Breakfast", "Lunch", "Dinner"], {
    required_error: "You need to select a meal type.",
  }),
  image: z.any().optional(),
  dishName: z.string().min(1, { message: 'Dish name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  calories: z.coerce.number().positive({ message: 'Calories must be a positive number.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  nutrition: z.array(z.object({
    name: z.string().min(1, { message: 'Nutrient name cannot be empty.' }),
    value: z.coerce.number().positive({ message: 'Value must be a positive number.' })
  })).optional(),
});

const EditMenuModal = ({ isOpen, onOpenChange, menu, onSubmit, loading }) => {
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

  useEffect(() => {
    if (menu) {
      const transformedNutrition = menu.nutrition?.map(item => {
        const name = Object.keys(item)[0];
        const value = item[name];
        return { name, value };
      }) || [];

      form.reset({
        dishName: menu.dishName || '',
        description: menu.description || '',
        dateRange: {
          from: menu.weekStart ? new Date(menu.weekStart) : undefined,
          to: menu.weekEnd ? new Date(menu.weekEnd) : undefined,
        },
        mealType: menu.mealType || undefined,
        calories: menu.calories || '',
        price: menu.price || '',
        image: undefined,
        nutrition: transformedNutrition,
      });
    }
  }, [menu, form]);

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
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription className="sr-only">Edit the menu details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dishName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dish Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Classic Burger" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A short description of the dish..." {...field} />
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
                      <FormLabel>Week Availability</FormLabel>
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
                      <FormLabel>Meal Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a meal type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Breakfast">Breakfast</SelectItem>
                          <SelectItem value="Lunch">Lunch</SelectItem>
                          <SelectItem value="Dinner">Dinner</SelectItem>
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
                        <FormLabel>Calories</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 550" {...field} />
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
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 12.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Additional Nutrition (optional)</FormLabel>
                  <div className="space-y-3 mt-2">
                    {fields.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start p-2 border rounded-md">
                        <FormField
                          control={form.control}
                          name={`nutrition.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Nutrient Name (e.g. Protein)" {...field} />
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
                                  <Input type="number" placeholder="Value" {...field} />
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
                            <XCircle className="h-5 w-5" />
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
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Nutrient
                    </Button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Dish Image</FormLabel>
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
                            id="edit-image-upload"
                          />
                          <label
                            htmlFor="edit-image-upload"
                            className="flex items-center gap-3 border-2 border-dashed border-muted-foreground/50 rounded-md px-4 py-3 cursor-pointer hover:bg-muted/50 transition min-h-[64px]"
                          >
                            {previewUrl || menu?.image ? (
                              <>
                                <img 
                                  src={previewUrl || getImageUrl(menu?.image)} 
                                  alt={selectedFile?.name || menu.dishName} 
                                  className="h-12 w-12 rounded object-cover" 
                                />
                                <div className="flex flex-col items-start">
                                  <span className="text-sm font-medium truncate max-w-[220px]">
                                    {selectedFile?.name || menu.dishName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">Click to change</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <UploadCloud className="h-6 w-6 text-muted-foreground" />
                                <div className="flex flex-col items-start">
                                  <span className="text-sm text-muted-foreground">Click to upload an image</span>
                                  <span className="text-xs text-muted-foreground">PNG, JPG, GIF</span>
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
                Cancel
              </Button>
              <Button type="submit" disabled={loading} loading={loading}>
                Update Menu
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenuModal;
