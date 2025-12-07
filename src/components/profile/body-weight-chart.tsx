"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {
        date: "Jan 01",
        weight: 78.5,
    },
    {
        date: "Jan 08",
        weight: 78.2,
    },
    {
        date: "Jan 15",
        weight: 77.8,
    },
    {
        date: "Jan 22",
        weight: 77.5,
    },
    {
        date: "Jan 29",
        weight: 77.1,
    },
    {
        date: "Feb 05",
        weight: 76.8,
    },
    {
        date: "Feb 12",
        weight: 76.2,
    },
]

export function BodyWeightChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tickFormatter={(value) => `${value}kg`}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
