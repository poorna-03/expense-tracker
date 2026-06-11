import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#9333ea"
];

export default function ExpenseChart({
  expenses
}) {

  const categories = [
    "Tea",
    "Food",
    "Petrol",
    "Extra"
  ];

  const data = categories.map(cat => ({
    name: cat,
    value: expenses
      .filter(e => e.category === cat)
      .reduce((a,b)=>a+b.amount,0)
  }));

  return (

    <div className="bg-white mt-8 p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Expense Analysis
      </h2>

      <PieChart width={400} height={300}>

        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >

          {data.map((entry,index)=>(
            <Cell
              key={index}
              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />
          ))}

        </Pie>

        <Tooltip />

      </PieChart>

    </div>

  );

}
