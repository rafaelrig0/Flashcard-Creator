import { RadialBarChart, RadialBar, PolarAngleAxis, Label } from 'recharts'

function AccuracyChart({ accuracyGeral }) {
    const percentage = accuracyGeral?.percentage ?? 0;
    const chartData = [{ value: percentage }]

    let color = "#FFF0F5";

    if (percentage >= 80) color = "#FF69B4";
    else if (percentage >= 55) color = "#FFB6C1";
    else color = "#FFE4E1";

    const chartConfig = {
    width: 500,
    height: 300,
    innerRadius: "50%",
    outerRadius: "80%",
    data: chartData,
    startAngle: 180,
    endAngle: 0
}

    return (
        <div>

            <RadialBarChart {...chartConfig} className="mx-auto">
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" fill={color} background={{ fill: '#B5B5B5' }} >

                    <Label value={accuracyGeral ? `${accuracyGeral.percentage}%` : '0%'}
                    position="center" className="text-4xl text-[#FFE4E1] font-bold " />

                </RadialBar>

            </RadialBarChart>

        </div>
    )
}

export default AccuracyChart;