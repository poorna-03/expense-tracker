import { useState, useEffect } from "react";
import ExpenseChart from "./components/ExpenseChart";
import jsPDF from "jspdf";
function App() {

  const [tea,setTea] = useState("");
  const [food,setFood] = useState("");
  const [petrol,setPetrol] = useState("");
  const [extraName, setExtraName] = useState("");
  const [extraAmount, setExtraAmount] = useState("");
  
  const [expenses,setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const addExpense = (category, amount) => {

    if(!amount) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        category,
        amount: Number(amount),
        date: date
      }
    ]);
  };
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Expense Report",
      20,
      20
    );

    doc.text(
      `Grand Total: ₹${grandTotal}`,
      20,
      40
    );

    doc.text(
      `Weekly Total: ₹${weeklyTotal}`,
      20,
      60
    );

    doc.text(
      `Monthly Total: ₹${monthlyTotal}`,
      20,
      80
    );

    doc.save(
      "Expense_Report.pdf"
    );
  };
  const totalTea = expenses
    .filter(x => x.category === "Tea")
    .reduce((a,b)=>a+b.amount,0);

  const totalFood = expenses
    .filter(x => x.category === "Food")
    .reduce((a,b)=>a+b.amount,0);

  const totalPetrol = expenses
    .filter(x => x.category === "Petrol")
    .reduce((a,b)=>a+b.amount,0);
  
  const totalExtras = expenses
    .filter(x => x.category === "Extra")
    .reduce((a,b)=>a+b.amount,0);

  const grandTotal =
    totalTea +
    totalFood +
    totalPetrol+
    totalExtras;
  
    const weeklyTotal = expenses
    .filter(item => {
      const expenseDate = new Date(item.date);
      const today = new Date();
      const diff = (today - expenseDate) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    })
    .reduce((sum, item) => sum + item.amount, 0);
  
    const monthlyTotal = expenses
    .filter(item => {
      const expenseDate = new Date(item.date);
      const today = new Date();

      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, item) => sum + item.amount, 0);
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-700">
            Welcome Sabarish 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Track your daily expenses smarter
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-blue-100 mb-6">
          <label className="block text-blue-700 font-semibold mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
          />

        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition">

            <h2 className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 py-3 rounded-xl font-semibold">
              ☕ Tea
            </h2>

            <input
              type="number"
              value={tea}
              onChange={(e)=>setTea(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={()=>{
                addExpense("Tea",tea);
                setTea("");
              }}
              className="bg-blue-500 text-white mt-3 px-4 py-2 rounded"
            >
              Add
            </button>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition">

            <h2 className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 py-3 rounded-xl font-semibold">
              🍚 Food
            </h2>

            <input
              type="number"
              value={food}
              onChange={(e)=>setFood(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={()=>{
                addExpense("Food",food);
                setFood("");
              }}
              className="bg-green-500 text-white mt-3 px-4 py-2 rounded"
            >
              Add
            </button>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition">

            <h2 className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4 py-3 rounded-xl font-semibold">
              ⛽ Petrol
            </h2>

            <input
              type="number"
              value={petrol}
              onChange={(e)=>setPetrol(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={()=>{
                addExpense("Petrol",petrol);
                setPetrol("");
              }}
              className="bg-red-500 text-white mt-3 px-4 py-2 rounded"
            >
              Add
            </button>

          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 mt-6">

            <h2 className="text-xl font-bold text-purple-700 mb-3">
              ➕ Extras
            </h2>

            <input
              type="text"
              placeholder="Expense Name"
              value={extraName}
              onChange={(e)=>setExtraName(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-xl p-3 mb-3"
            />

            <input
              type="number"
              placeholder="Amount"
              value={extraAmount}
              onChange={(e)=>setExtraAmount(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-xl p-3"
            />

            <button
              onClick={()=>{
                if(!extraName || !extraAmount) return;

                setExpenses([
                  ...expenses,
                  {
                    id: Date.now(),
                    category: "Extra",
                    name: extraName,
                    amount: Number(extraAmount),
                    date: date
                  }
                ]);

                setExtraName("");
                setExtraAmount("");
              }}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl"
            >
              Add Extra
            </button>

          </div>

        </div>
        <ExpenseChart expenses={expenses}/>
        <div className="bg-white mt-8 p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Today's Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-blue-700">Tea</h3>
              <p className="text-2xl font-bold">₹{totalTea}</p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-green-700">Food</h3>
              <p className="text-2xl font-bold">₹{totalFood}</p>
            </div>

            <div className="bg-orange-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-orange-700">Petrol</h3>
              <p className="text-2xl font-bold">₹{totalPetrol}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-purple-700">
                Extras
              </h3>

              <p className="text-2xl font-bold">
                ₹{totalExtras}
              </p>
            </div>
          </div>

          <hr className="my-3"/>

          <div className="bg-blue-600 text-white p-5 rounded-2xl text-center">
            <h3 className="text-lg">
              Grand Total
            </h3>

            <p className="text-4xl font-bold">
              ₹{grandTotal}
            </p>
          </div>

        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <div className="bg-green-100 p-5 rounded-xl text-center">
            <h3 className="text-xl font-bold text-green-700">
             Weekly Total
            </h3>

            <p className="text-3xl font-bold">
              ₹{weeklyTotal}
            </p>
          </div>

          <div className="bg-blue-100 p-5 rounded-xl text-center">
            <h3 className="text-xl font-bold text-blue-700">
              Monthly Total
            </h3>

            <p className="text-3xl font-bold">
              ₹{monthlyTotal}
            </p>
          </div>

        </div>
        <div className="text-center mt-6">

          <button
            onClick={downloadPDF}
            className="bg-red-600 text-white px-5 py-3 rounded-xl"
          >
            📄 Download PDF
          </button>

        </div>
        <div className="bg-white mt-8 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Expense History
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th>Date</th>
                <th>Category</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {expenses.map((item)=>(
                <tr key={item.id} className="border-b text-center">

                  <td>{item.date}</td>

                  <td>{item.category}</td>

                  <td>{item.name || "-"}</td>

                  <td>₹{item.amount}</td>

                  <td>

                    <button
                      onClick={()=>{
                        setExpenses(
                          expenses.filter(
                            x => x.id !== item.id
                          )
                        )
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {

                        const newAmount = prompt(
                          "Enter New Amount",
                          item.amount
                        );

                        if(!newAmount) return;

                        setExpenses(
                          expenses.map(exp =>
                            exp.id === item.id
                              ? {
                                  ...exp,
                                  amount:Number(newAmount)
                                }
                              : exp
                            )
                          );

                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;
