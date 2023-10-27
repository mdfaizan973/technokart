import { useState, useEffect } from "react";
import axios from "axios";
export default function Dashboard() {
  const [data, setData] = useState([]);
  //Get
  useEffect(() => {
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

  // Delete
  const handledelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/invoices/${id}`)
      .then((res) => {
        console.log(res);
        // alert(`Invoice with ID ${id} has been deleted.`);
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        alert(`Error deleting invoice with ID ${id}: ${error.message}`);
      });
  };

  // search
  const handleFilter = (keyword) => {
    // Filter the data based on a keyword search

    const filtered = data.filter(
      (item) =>
        item.invoiceNumber.toString().includes(keyword) ||
        item.invoiceDate.includes(keyword) ||
        item.invoiceAmount.toString().includes(keyword) ||
        item.financialYear.includes(keyword)
    );
    setData(filtered);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-16 ">
        <div className="relative">
          <input
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Search.... Invoice Number.... Amount....	Financial Year...."
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-[420px] border"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

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
                    <button
                      onClick={() => handledelete(ele._id)}
                      className="bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-lg"
                    >
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
