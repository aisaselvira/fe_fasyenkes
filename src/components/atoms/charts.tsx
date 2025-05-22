"use client";

import {useEffect, useRef} from "react";

interface PieChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

export function PieChart({data}: PieChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set dimensions
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        // Calculate total
        // const total = data.reduce((sum, item) => sum + item.value, 0);

        // Draw pie chart
        let startAngle = 0;
        data.forEach((item) => {
            const sliceAngle = (2 * Math.PI * item.value) / 100;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();

            ctx.fillStyle = item.color;
            ctx.fill();

            // Add percentage text
            const textAngle = startAngle + sliceAngle / 2;
            const textX = centerX + radius * 0.6 * Math.cos(textAngle);
            const textY = centerY + radius * 0.6 * Math.sin(textAngle);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${item.value}%`, textX, textY);

            startAngle += sliceAngle;
        });
    }, [data]);

    return (
        <div className="relative w-full max-w-[250px] mx-auto">
            <canvas ref={canvasRef} width={250} height={250} className="w-full h-auto" />
        </div>
    );
}

interface BarChartProps {
    data: {
        categories: string[];
        values: {
            name: string;
            completed: number;
            total: number;
            color: string;
        }[];
    };
}

export function BarChart({data}: BarChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set dimensions
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const barWidth = chartWidth / (data.categories.length * 2);
        const maxValue = Math.max(...data.values.map((item) => item.total)) + 2;

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw horizontal grid lines
        const gridCount = 5;
        const gridStep = chartHeight / gridCount;
        const valueStep = maxValue / gridCount;

        for (let i = 0; i <= gridCount; i++) {
            const y = canvas.height - padding - i * gridStep;
            const value = Math.round(i * valueStep);

            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.strokeStyle = "#EEF2F6";
            ctx.stroke();

            // Draw y-axis labels
            ctx.fillStyle = "#64748B";
            ctx.font = "12px Arial";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillText(value.toString(), padding - 10, y);
        }

        // Draw bars and x-axis labels
        data.categories.forEach((category, index) => {
            const x = padding + index * (barWidth * 3) + barWidth;

            // Draw x-axis labels
            ctx.fillStyle = "#64748B";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(category, x + barWidth / 2, canvas.height - padding + 10);

            // Draw bar
            const value = data.values[index].completed;
            const barHeight = (value / maxValue) * chartHeight;

            ctx.fillStyle = data.values[index].color;
            ctx.fillRect(x, canvas.height - padding - barHeight, barWidth, barHeight);
        });
    }, [data]);

    return (
        <div className="relative w-full h-[250px]">
            <canvas ref={canvasRef} width={500} height={300} className="w-full h-full" />
        </div>
    );
}
