import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loding";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [someId, setSomeId] = useState("");
  // const [getEditD, setGetEditD] = useState({});
  // const handleEdit = (id) => {
  //   document.getElementById("Edit_Btn").showModal();
  //   axios
  //     .get(`https://techkartmanagement.onrender.com/invioces/${id}`)
  //     .then((response) => {
  //       // console.log("Invoice Edit Data:", response.data);
  //       setGetEditD(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching invoices:", error);
  //     });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(getEditD);
  //   // axios
  //   //   .put(`https://techkartmanagement.onrender.com/invioces`, getEditD)
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //     toast.success(`Edit Successfully`, {
  //   //       position: toast.POSITION.TOP_CENTER,
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // };
  // ----
  const [getEditD, setGetEditD] = useState({
    invoiceDate: "",
    invoiceNumber: "",
    invoiceAmount: "",
  });

  const handleEdit = (id) => {
    document.getElementById("Edit_Btn").showModal();
    axios
      .get(`https://techkartmanagement.onrender.com/invioces/${id}`)
      .then((response) => {
        setGetEditD(response.data);
        setSomeId(response.data.id);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      invoiceDate: getEditD.invoiceDate,
      invoiceNumber: getEditD.invoiceNumber,
      invoiceAmount: getEditD.invoiceAmount,
    };

    console.log(updatedData, someId);

    // axios
    //   .put(`https://techkartmanagement.onrender.com/invioces`, getEditD)
    //   .then((res) => {
    //     console.log(res);
    //     toast.success(`Edit Successfully`, {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .put(
        `https://techkartmanagement.onrender.com/invioces/${someId}`,
        updatedData
      ) // Replace someId with the actual ID
      .then((res) => {
        console.log(res);
        toast.success("Edit Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  //Get
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://techkartmanagement.onrender.com/invioces")
      .then((response) => {
        // console.log("Invoice Data:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  }, []);

  // Delete
  const handledelete = (id) => {
    axios
      .delete(`https://techkartmanagement.onrender.com/invioces/${id}`)
      .then((res) => {
        console.log(res);
        // alert(`Invoice with ID ${id} has been deleted.`);
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        toast.error(`Invioce Deleted Successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        alert(`Error deleting invoice with ID ${id}: ${error} `);
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
      <ToastContainer />
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
              className="h-6 w-6 text-gray-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              Re
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
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
                  <td className="py-3 px-6 text-center">
                    $ {ele.invoiceAmount}
                  </td>
                  <td className="py-3 px-6 text-center">{ele.financialYear}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          handleEdit(ele.id);
                        }}
                        className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handledelete(ele.id)}
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
      )}

      <dialog id="Edit_Btn" className="rounded-[20px] p-2">
        <form method="dialog">
          {" "}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form className="w-[400px] p-2 rounded-[20px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="invoiceDate"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice Date:
            </label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              value={getEditD.invoiceDate}
              onChange={(e) =>
                setGetEditD({ ...getEditD, invoiceDate: e.target.value })
              }
              placeholder="InvoiceDate"
              className="py-3 px-4 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="invoiceNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice Number:
            </label>
            <input
              type="number"
              id="invoiceNumber"
              name="invoiceNumber"
              value={getEditD.invoiceNumber}
              onChange={(e) =>
                setGetEditD({ ...getEditD, invoiceNumber: e.target.value })
              }
              placeholder="InvoiceNumber"
              className="py-3 px-4 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="invoiceAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Invoice Amount:
            </label>
            <input
              type="number"
              id="invoiceAmount"
              name="invoiceAmount"
              value={getEditD.invoiceAmount}
              onChange={(e) =>
                setGetEditD({ ...getEditD, invoiceAmount: e.target.value })
              }
              placeholder="InvoiceAmount"
              className="py-3 px-4 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Submit
          </button>
        </form>
      </dialog>
    </div>
  );
}
