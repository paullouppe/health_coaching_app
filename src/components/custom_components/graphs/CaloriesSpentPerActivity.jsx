import { BarChart, Bar, LabelList, ResponsiveContainer, Legend } from 'recharts';

function CaloriesSpentPerActivity({ patient, setGraphName, physicalActivities }) {
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
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={parseDataFromPatient()}>
                <Bar dataKey="caloriesSpent" fill="#D5C4F3">
                    <LabelList dataKey="caloriesSpent" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CaloriesSpentPerActivity;
