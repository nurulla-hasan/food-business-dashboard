import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Flame, DollarSign, Calendar, Utensils, Info } from 'lucide-react';
import { formatDate, getImageUrl } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const ViewMenuModal = ({ isOpen, onOpenChange, menu }) => {
    console.log(menu);
    const { t } = useTranslation('weekly_menu');
    if (!menu) return null;
    const totalCalories = menu.calories || 0;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md md:max-w-2xl lg:max-w-4xl p-0">
                <ScrollArea className="max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader className="mb-4 text-center md:text-left">
                            <DialogTitle className="text-2xl lg:text-3xl font-bold text-primary">{menu.dishName}</DialogTitle>
                            <DialogDescription className="flex items-center justify-center md:justify-start gap-2 pt-1">
                                <Utensils className="h-4 w-4" />
                                <span className="font-medium">{menu.mealType}</span>
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            {/* Left Column: Image and Key Stats */}
                            <div className="space-y-4">
                                <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-lg border">
                                    <img
                                        src={getImageUrl(menu?.image)}
                                        alt={menu.dishName}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder-image.jpg';
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <StatCard
                                        icon={<Flame className="h-5 w-5 text-red-500" />}
                                        label={t('calories')}
                                        value={totalCalories}
                                    />
                                    <StatCard
                                        icon={<DollarSign className="h-5 w-5 text-green-500" />}
                                        label={t('price')}
                                        value={`${menu.price?.toFixed(2)}`}
                                    />
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="space-y-6">
                                <InfoSection icon={<Info className="h-5 w-5 text-primary" />} title={t('description')}>
                                    <p className="text-muted-foreground">{menu.description}</p>
                                </InfoSection>

                                <Separator />

                                <InfoSection icon={<Calendar className="h-5 w-5 text-primary" />} title={t('availability')}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{t('from')}</p>
                                            <p className="font-medium">{formatDate(menu.weekStart)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{t('to')}</p>
                                            <p className="font-medium">{formatDate(menu.weekEnd)}</p>
                                        </div>
                                    </div>
                                </InfoSection>

                                {totalCalories > 0 && (
                                    <>
                                        <Separator />
                                        <InfoSection title={t('nutritional_value')}>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium">{t('total_calories')}</span>
                                                    <span className="font-bold">{totalCalories} cal</span>
                                                </div>
                                                <div className="h-2.5 bg-muted rounded-full overflow-hidden w-full">
                                                    <div
                                                        className="h-full bg-green-500 rounded-full"
                                                        style={{ width: `${Math.min(100, (totalCalories / 2000) * 100)}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground text-right">
                                                    {t('calorie_diet_base')}
                                                </p>
                                            </div>
                                        </InfoSection>
                                    </>
                                )}
                                <Separator />
                                {menu.nutrition && menu.nutrition.length > 0 && (
                                    <InfoSection title={t('nutrition')}>
                                        <div className="space-y-2">
                                            {menu.nutrition.map((nutrient, index) => {
                                                const [label, value] = Object.entries(nutrient)[0];
                                                return (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <span className="text-sm font-medium">{label}</span>
                                                        <span className="font-bold">{value}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </InfoSection>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="px-6 py-4 bg-muted/40 border-t">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            {t('close')}
                        </Button>
                    </DialogFooter>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center justify-center text-center h-full">
        {icon}
        <p className="text-sm font-medium mt-2">{label}</p>
        <p className="text-lg font-bold">{value}</p>
    </div>
);

const InfoSection = ({ icon, title, children }) => (
    <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            {icon}
            {title}
        </h3>
        <div className="pl-1">{children}</div>
    </div>
);

export default ViewMenuModal;
