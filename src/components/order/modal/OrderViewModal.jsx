import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatDate, getImageUrl, getInitials } from '@/lib/utils';
import { Calendar, DollarSign, Hash, Mail, MapPin, Phone, ShoppingCart, User } from 'lucide-react';

const OrderViewModal = ({ isOpen, onOpenChange, order }) => {
    if (!order) return null;

    const getStatusVariant = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'warning';
            case 'complete': return 'success';
            case 'cancel': return 'destructive';
            default: return 'outline';
        }
    };

    const getPaymentStatusVariant = (status) => {
        return status?.toLowerCase() === 'paid' ? 'success' : 'warning';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md md:max-w-2xl lg:max-w-4xl p-0">
                <ScrollArea className="max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl lg:text-3xl font-bold text-primary">Order Details</DialogTitle>
                            <DialogDescription className="flex items-center gap-2 pt-1">
                                <Hash className="h-4 w-4" />
                                <span className="font-mono text-sm">{order._id}</span>
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                            {/* Left Column: Menu Item Details */}
                            <div className="lg:col-span-2 space-y-4">
                                <InfoSection icon={<ShoppingCart />} title="Ordered Item">
                                    <div className="relative aspect-video overflow-hidden rounded-lg border">
                                        <img 
                                            src={order.menus_id?.image ? getImageUrl(order.menus_id.image) : 'https://placehold.co/600x400?text=No+Image'}
                                            alt={order.menus_id?.dishName || 'Menu item'}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold pt-2">{order.menus_id?.dishName}</h3>
                                    <div className="flex items-center justify-between text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-green-500" />
                                            <span className="font-bold text-lg text-green-600">${order.menus_id?.price?.toFixed(2)}</span>
                                        </div>
                                        <Badge variant="outline">{order.mealType}</Badge>
                                    </div>
                                </InfoSection>
                            </div>

                            {/* Right Column: Customer and Order Details */}
                            <div className="lg:col-span-3 space-y-6">
                                <InfoSection icon={<User />} title="Customer Information">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                                            <AvatarImage src={order.user?.profile_image} />
                                            <AvatarFallback className="text-xl">{getInitials(order.user?.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-lg">{order.user?.name}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="h-3 w-3"/>{order.user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground space-y-1 mt-4">
                                        <p className="flex items-center gap-2"><Phone className="h-3 w-3"/> {order.user?.phone_number}</p>
                                        <p className="flex items-center gap-2"><MapPin className="h-3 w-3"/> {order.user?.address}</p>
                                    </div>
                                </InfoSection>

                                <Separator />

                                <InfoSection icon={<Calendar />} title="Order Status">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Order Date</p>
                                            <p className="font-semibold">{formatDate(order.date)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                                            <Badge variant={getPaymentStatusVariant(order.paymentStatus)} className="text-sm">{order.paymentStatus}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Order Status</p>
                                            <Badge variant={getStatusVariant(order.status)} className="text-sm">{order.status}</Badge>
                                        </div>
                                    </div>
                                </InfoSection>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="px-6 py-4 bg-muted/40 border-t">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

const InfoSection = ({ icon, title, children }) => (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-muted-foreground">
            {icon}
            <span>{title}</span>
        </h3>
        <div className="pl-8">{children}</div>
    </div>
);

export default OrderViewModal;
