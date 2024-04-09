import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

function GoalProgressGraph({ patient }) {

    const weightProgress = Math.floor(Math.min(patient.weightStart, patient.weightGoal) / Math.max(patient.weightStart, patient.weightGoal) * 100);
    const data = [
        { name: 'Group A', value: weightProgress },
        { name: 'Group B', value: 100 - weightProgress },
    ];

    const COLORS = ['#7C3AED', '#42217B'];

    return (
        <ResponsiveContainer width="100%" height={100}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%" // Center the pie horizontally
                    cy="100%" // Center the pie vertically
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className='flex flex-col items-center -mt-10 font-medium'>
                <div className='text-2xl'>
                    {weightProgress}%
                </div>
                <div>Goal progress</div>
            </div>

        </ResponsiveContainer>
    );
}

export default GoalProgressGraph;
