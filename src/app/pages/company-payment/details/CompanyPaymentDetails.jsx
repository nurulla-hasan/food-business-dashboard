import { useParams } from "react-router-dom";
import { useGetCompanyDetailsQuery } from "@/redux/feature/company-payment/companyPaymentApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";

const CompanyPaymentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetCompanyDetailsQuery(id);

    const company = data?.data?.company;
    const totalOrder = data?.data?.totalOrder || 0;
    const totalEmployers = data?.data?.totalEmployers || 0;

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
                <Skeleton className="h-64" />
            </div>
        );
    }

    if (isError || !company) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-semibold mb-2">Error loading company details</h2>
                <p className="text-muted-foreground mb-4">
                    {isError ? "Failed to load company information." : "Company not found"}
                </p>
                <Button onClick={() => navigate(-1)} variant="outline">
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Company Details</h1>
            </div>

            {/* Top Section - Cards and Company Info Side By Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrder}</div>
                            <p className="text-xs text-muted-foreground">All time orders</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalEmployers}</div>
                            <p className="text-xs text-muted-foreground">Active employers</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side - Company Information */}
                <div className="lg:col-span-1">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Company Information</CardTitle>
                            <Badge variant={company.status === 'active' ? 'default' : 'destructive'}>
                                {company.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={company.profile_image} alt={company.name} />
                                        <AvatarFallback>{getInitials(company.name || '')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-medium">{company.name}</h3>
                                        <p className="text-sm text-muted-foreground">{company.email}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                                        <div className="space-y-1">
                                            <p className="text-sm">{company.phone_number || 'N/A'}</p>
                                            <p className="text-sm">{company.address || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">Additional Information</h4>
                                        <div className="space-y-1">
                                            <p className="text-sm">
                                                <span className="text-muted-foreground">Member since:</span>{' '}
                                                {new Date(company.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-muted-foreground">Last updated:</span>{' '}
                                                {new Date(company.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Full Width Table at Bottom */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Employe Name</TableHead>
                        <TableHead>Menu</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default CompanyPaymentDetails;