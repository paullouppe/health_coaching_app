import { BarChart, Bar, LabelList, ResponsiveContainer } from 'recharts';

function CaloriesSpentPerActivity({ patient, setGraphName, physicalActivities }) {
    let data = [
        {
            name: 'bike',
            uv: 0
        },
        {
            name: 'footing',
            uv: 0
        },
        {
            name: 'walking',
            uv: 0
        },
        {
            name: 'swimming',
            uv: 0
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
                data[dataIndex].uv += activity.consumedCalories;
            }
        });
        return data;
    }

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={parseDataFromPatient()}>
                <Bar dataKey="uv" fill="#8884d8">
                    <LabelList dataKey="uv" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CaloriesSpentPerActivity;
