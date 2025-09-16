import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReportTable = ({ reports, page, limit, deleteLoading, onDelete }) => {
  return (
    <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Reported User</TableHead>
            <TableHead>Incident Type</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Reported On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={report._id}>
              <TableCell>{(page - 1) * limit + index + 1}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={report.reportFrom?.profile_image} />
                    <AvatarFallback>{getInitials(report.reportFrom?.name)}</AvatarFallback>
                  </Avatar>
                  <span>{report.reportFrom?.name || 'N/A'}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={report.reportTo?.profile_image} />
                    <AvatarFallback>{getInitials(report.reportTo?.name)}</AvatarFallback>
                  </Avatar>
                  <span>{report.reportTo?.name || 'N/A'}</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="outline" className="whitespace-normal text-left">
                  {report.incidentType || 'N/A'}
                </Badge>
              </TableCell>

              <TableCell className="max-w-[200px]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="truncate">
                      {report.additionalNote || 'No additional notes'}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[300px] break-words">
                    <p className="text-sm">{report.additionalNote || 'No additional notes'}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>

              <TableCell>
                {report.createdAt ? formatDate(report.createdAt) : 'N/A'}
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button
                  onClick={() => onDelete?.(report)}
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:bg-red-50"
                  disabled={deleteLoading}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default ReportTable;
