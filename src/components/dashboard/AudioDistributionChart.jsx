
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AudioDistributionChart = ({ audioDistributionChartData }) => {
    const { t } = useTranslation('dashboard');
    const { shortAudioCount = 0, longAudioCount = 0, totalCount = 0 } = audioDistributionChartData || {};
    
    const chartData = [
        { name: t('total_audio'), value: totalCount, percentage: totalCount > 0 ? Math.round((totalCount / totalCount) * 100) : 0 },
        { name: t('short_duration_audio'), value: shortAudioCount, percentage: totalCount > 0 ? Math.round((shortAudioCount / totalCount) * 100) : 0 },
        { name: t('long_duration_audio'), value: longAudioCount, percentage: totalCount > 0 ? Math.round((longAudioCount / totalCount) * 100) : 0 },
    ];
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('audio_distribution')}</h2>
                <div className="text-sm text-muted-foreground">{t('total_audios', { count: totalCount })}</div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
                {chartData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center">
                            <span className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                            <span>{`${index + 1}. ${entry.name}`}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">{`+${entry.percentage}%`}</span>
                            <span>{entry.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioDistributionChart;
