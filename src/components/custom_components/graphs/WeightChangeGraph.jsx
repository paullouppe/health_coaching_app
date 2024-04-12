import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { useMemo } from 'react';

function WeightChangeGraph({ patient, setGraphName, physiologicalData }) {
    // Data formatting, filtering, sorting, and string conversion
    const formattedData = useMemo(() => {
        // Find the most recent date in the dataset
        const mostRecentDate = new Date(Math.max(...physiologicalData.map(e => new Date(e.date))));

        // Calculate four months back from the most recent date
        const fourMonthsAgo = new Date(mostRecentDate);
        fourMonthsAgo.setMonth(mostRecentDate.getMonth() - 4);

        // Filter, sort, and format the data
        const filteredData = physiologicalData.filter(element =>
            new Date(element.date) >= fourMonthsAgo
        );

        const sortedData = filteredData.sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );

        const dataWithFormattedDates = sortedData.map(element => ({
            date: new Date(element.date).toLocaleString('en', { month: 'short' }),
            weight: element.weight
        }));

        return dataWithFormattedDates;
    }, [physiologicalData]);

    // Min and max weight calculations
    const minWeight = useMemo(() => formattedData.length > 0 ? formattedData.reduce((min, p) => Math.min(min, p.weight), formattedData[0].weight).toFixed(2) : 0, [formattedData]);
    const maxWeight = useMemo(() => formattedData.length > 0 ? formattedData.reduce((max, p) => Math.max(max, p.weight), formattedData[0].weight).toFixed(2) : 0, [formattedData]);

    return (
        <div className="px-2">
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formattedData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[Math.max(minWeight - 5, 0), Number(maxWeight) + 5]} hide={true} />
                    <Tooltip/>
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeightChangeGraph;
