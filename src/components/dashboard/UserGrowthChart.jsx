import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserGrowthChart = ({userGrowthChartData, onYearChange, selectedYear}) => {
    const { chartData = [], yearsDropdown = [], } = userGrowthChartData || {};
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Growth</h2>
                <Select onValueChange={onYearChange} value={selectedYear?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {yearsDropdown?.map((year) => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid horizontal={false} vertical={false}/>
                    <XAxis dataKey="month" axisLine={true} tickLine={false}/>
                    <YAxis axisLine={true} tickLine={false}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar type="monotone" dataKey="totalUser" stroke="#8884d8" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserGrowthChart;