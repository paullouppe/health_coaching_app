import { useEffect } from 'react';
import { BarChart, Bar, LabelList, ResponsiveContainer, Legend } from 'recharts';

function CaloriesSpentPerActivity({ patient, newGraphName, physicalActivities }) {

    useEffect(() => {
        newGraphName("Calories spent");
    }, [])

    let data = [
        {
            name: 'bike',
            caloriesSpent: 0
        },
        {
            name: 'footing',
            caloriesSpent: 0
        },
        {
            name: 'walking',
            caloriesSpent: 0
        },
        {
            name: 'swimming',
            caloriesSpent: 0
        }
    ];

    const activityMapping = {
        'bike': 0,
        'footing': 1,
        'walking': 2,
        'swimming': 3,
    };

    const parseDataFromPatient = () => {
        physicalActivities.forEach(activity => {
            const dataIndex = activityMapping[activity.type];
            if (dataIndex !== undefined) {
                data[dataIndex].caloriesSpent += activity.consumedCalories;
            }
        });
        return data;
    }

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={parseDataFromPatient()}>
                    <Bar dataKey="caloriesSpent" fill="#D5C4F3">
                        <LabelList dataKey="caloriesSpent" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className='flex justify-between px-7 pb-2'>
                <img src='http://localhost:5173/images/biking.svg' />
                <img src='http://localhost:5173/images/coureur.svg' />
                <img src='http://localhost:5173/images/homme-pieton.svg' />
                <img src='http://localhost:5173/images/la-natation.svg' />
            </div>
        </div>
    );
}

export default CaloriesSpentPerActivity;