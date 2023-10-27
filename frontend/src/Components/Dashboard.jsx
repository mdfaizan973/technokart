import { useState, useEffect } from "react";
import axios from "axios";
export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make a GET request to the backend API endpoint
    axios
      .get("http://localhost:5000/api/invoices")
      .then((response) => {
        // console.log("Invoice Data:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  }, []);
  return (
    <div>
      <div className="w-[70%] mx-auto bg-white rounded-[20px] shadow-md  my-6">
        <table className="min-w-max w-full table-auto ">
          <thead>
            <tr className="bg-gray-500 text-white text-sm leading-normal">
              <th className="py-3 px-6 text-left">Invoice Number</th>
              <th className="py-3 px-6 text-left">Invoice Date</th>
              <th className="py-3 px-6 text-center">Invoice Amount</th>
              <th className="py-3 px-6 text-center">Financial Year</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((ele, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{ele.invoiceNumber}</td>
                <td className="py-3 px-6 text-left">{ele.invoiceDate}</td>
                <td className="py-3 px-6 text-center">$ {ele.invoiceAmount}</td>
                <td className="py-3 px-6 text-center">{ele.financialYear}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <button className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded-lg mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-lg">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
