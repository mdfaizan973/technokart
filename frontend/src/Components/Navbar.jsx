import { useState } from "react";
import axios from "axios";
export default function Navbar() {
  const handleopenform = () => {
    document.getElementById("add_data").showModal();
  };

  const [formData, setFormData] = useState({
    invoiceDate: "",
    invoiceNumber: "",
    invoiceAmount: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Check if the Invoice Number is a positive integer
    if (!/^\d+$/.test(formData.invoiceNumber)) {
      setErrorMessage("Invoice Number must be a positive integer.");
      return;
    }

    // Send a GET request to check if the Invoice Number exists for the same financial year
    axios
      .get("http://localhost:5000/api/invoices", {
        params: {
          invoiceNumber: formData.invoiceNumber,
          financialYear: getFinancialYear(formData.invoiceDate),
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setErrorMessage(
            "Invoice number already exists for this financial year."
          );
        } else {
          setErrorMessage(""); // Clear any previous error message
          // Send a POST request to create the new invoice
          axios
            .post("http://localhost:5000/api/invoices", formData)
            .then((response) => {
              console.log("POST Request Response:", response.data);
            })
            .catch((error) => {
              console.error("Error making POST request:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking Invoice Number:", error);
      });
  };

  // Helper function to get the financial year
  function getFinancialYear(invoiceDate) {
    const date = new Date(invoiceDate);
    const year = date.getFullYear();
    return `${year}-${year + 1}`;
  }

  return (
    <div>
      <nav className="shadow-md p-2 flex justify-between items-center">
        <a
          href="#"
          className="flex items-center text-black text-xl font-semibold border-[3px] border-gray-400 p-2 rounded-md"
        >
          TECHNOKART
        </a>
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p> // Display error message in red
        )}
        <button
          onClick={handleopenform}
          className="bg-blue-400 text-black-500 rounded-md py-2 px-4 hover:bg-blue-100 transition border duration-300"
        >
          Add Invoice
        </button>
      </nav>

      <dialog id="add_data" className="rounded-[20px] p-2">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <form
            className="w-[400px]  p-2 rounded-[20px]"
            onSubmit={handleSubmit}
          >
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
                value={formData.invoiceDate}
                onChange={handleInputChange}
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
                value={formData.invoiceNumber}
                onChange={handleInputChange}
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
                value={formData.invoiceAmount}
                onChange={handleInputChange}
                placeholder="InvoiceAmount"
                className="py-3 px-4 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >
              Submit
            </button>
          </form>
        </form>
      </dialog>
    </div>
  );
}
