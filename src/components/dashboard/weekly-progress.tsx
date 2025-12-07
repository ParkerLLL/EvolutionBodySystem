"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    {
        name: "Mon",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Tue",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Wed",
        total: 0,
    },
    {
        name: "Thu",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Fri",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sat",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sun",
        total: 0,
    },
]

export function WeeklyProgress() {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
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
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
