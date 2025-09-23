
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

const EarningGrowthChart = ({earningGrowthChartData, onYearChange, selectedYear}) => {
    const { t } = useTranslation('dashboard');
    const { result = [], yearlyTotal = 0 } = earningGrowthChartData?.data || {};

    const years = Array.from({length: 6}, (_, i) => 2025 + i);
    return (
        <div className="bg-sidebar p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">{t('earning_growth')}</h2>
                    <p className="text-sm text-muted-foreground">
                        {t('yearly_total')} <span className="font-medium">${yearlyTotal?.toLocaleString()}</span>
                    </p>
                </div>
                <Select onValueChange={onYearChange} value={selectedYear?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('year')} />
                    </SelectTrigger>
                    <SelectContent>
                        {years?.map((year) => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={result}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Area 
                        type="monotone" 
                        dataKey="income" 
                        name={t('income')}
                        stroke="#1bd477" 
                        fill="#1bd477" 
                        fillOpacity={0.4}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningGrowthChart;
