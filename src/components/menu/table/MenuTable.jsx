import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, SquarePen, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IMAGE_BASE_URL } from "@/redux/feature/baseApi";
import { formatDate, getInitials } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MenuTable = ({ data, onEdit, onDelete, onView, page, limit }) => {
    const { t } = useTranslation('weekly_menu');

    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.N</TableHead>
                        <TableHead>{t('image')}</TableHead>
                        <TableHead>{t('dish_name')}</TableHead>
                        <TableHead>{t('meal_type')}</TableHead>
                        <TableHead>{t('price')}</TableHead>
                        <TableHead>{t('week_start')}</TableHead>
                        <TableHead className="text-right">{t('action')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                            <TableCell>
                                <Avatar className="w-9 h-9">
                                    <AvatarImage src={`${IMAGE_BASE_URL}${item.image}`} alt={item.dishName} />
                                    <AvatarFallback>{getInitials(item.dishName)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{item.dishName}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{item.mealType}</Badge>
                            </TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>{formatDate(item.weekStart)}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onView?.(item)}
                                >
                                    <Eye className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onEdit?.(item)}
                                >
                                    <SquarePen className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-red-500"
                                    onClick={() => onDelete?.(item)}
                                >
                                    <Trash className="h-5 w-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default MenuTable;