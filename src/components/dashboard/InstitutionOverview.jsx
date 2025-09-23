
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

const InstitutionOverview = ({ institutionOverviewData, onYearChange, selectedYear }) => {
    const { t } = useTranslation('dashboard');
    const { chartData = [], yearsDropdown = [] } = institutionOverviewData || {};
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('institution_overview')}</h2>
                <Select onValueChange={onYearChange} value={selectedYear?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('year')} />
                    </SelectTrigger>
                    <SelectContent>
                        {yearsDropdown?.map((year) => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">{t('total_institutions')}</p>
                    <p className="text-lg font-bold">
                        {chartData.reduce((sum, item) => sum + (item.totalInstitutions || 0), 0)}
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">{t('avg_members_per_institution')}</p>
                    <p className="text-lg font-bold">
                        {chartData.length > 0
                            ? (chartData.reduce((sum, item) => sum + (item.avgMembersPerInstitution || 0), 0) / chartData.length).toFixed(2)
                            : 0
                        }
                    </p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="totalInstitutions"
                        name={t('total_institutions')}
                        stroke="#6366f1"
                    />
                    <Line
                        type="monotone"
                        dataKey="avgMembersPerInstitution"
                        name={t('avg_members_per_institution_short')}
                        stroke="#14b8a6"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InstitutionOverview;
