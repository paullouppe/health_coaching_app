import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

function PatientMentalStateEvolution({ patient, psychologicalData }) {

    const feelingToNumber = {
        'addicted': 6,
        'enduring': 5,
        'motivated': 4,
        'loosing motivation': 3,
        'lazy': 2,
        'hopeless': 1
    };

    const formattedData = useMemo(() => {
        const mostRecentDate = new Date(Math.max(...psychologicalData.map(e => new Date(e.date))));

        const fourMonthsAgo = new Date(mostRecentDate);
        fourMonthsAgo.setMonth(mostRecentDate.getMonth() - 4);

        const filteredData = psychologicalData.filter(element =>
            new Date(element.date) >= fourMonthsAgo
        );
    
        const sortedData = filteredData.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );
        
        const dataWithFormattedDates = sortedData.map(element => ({
            date: new Date(element.date).toLocaleString('en', { month: 'short' }),
            feeling: feelingToNumber[element.feeling] 
        }));

        return dataWithFormattedDates;
    }, [psychologicalData]);
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const feelingValue = payload[0].value;
            // Find the feeling from the number
            const feelingKey = Object.keys(feelingToNumber).find(key => feelingToNumber[key] === feelingValue);
            return (
                <div className="custom-tooltip">
                    <p>{label}</p>
                    <p>{feelingKey || 'Unknown feeling'}</p>
                </div>
            );
        }
    
        return null;
    };

    return (
        <div className="px-2 ">
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formattedData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 7]} allowDataOverflow={true} hide="true"/>
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="feeling" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PatientMentalStateEvolution;
