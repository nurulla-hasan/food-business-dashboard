import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserGrowthChart = ({userGrowthChartData}) => {
    const { result = [] } = userGrowthChartData?.data || {};

    // const years = Array.from({length: 6}, (_, i) => 2025 + i);
    return (
        <div className="bg-sidebar p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Growth</h2>
                {/* <Select onValueChange={onYearChange} value={selectedYear?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result}>
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                        type="monotone" 
                        dataKey="users" 
                        name="Users"
                        stroke="#1bd477" 
                        fill="#1bd477" 
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserGrowthChart;