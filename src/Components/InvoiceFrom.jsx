import React, { useState } from "react";
import axios from "axios";

const InvoiceForm = () => {
  const [data, setData] = useState({
    sellerName: "",
    sellerAddress: "",
    sellerPan: "",
    sellerGst: "",
    billingName: "",
    billingAddress: "",
    shippingName: "",
    shippingAddress: "",
    placeOfSupply: "",
    placeOfDelivery: "",
    orderNo: "",
    orderDate: "",
    invoiceNo: "",
    invoiceDate: "",
    reverseCharge: "No",
    items: [],
    companyLogo: "companyLogo",
    signatureImage: "signatureImage",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...data.items];
    updatedItems[index][name] = value;
    setData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const addItem = () => {
    setData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { description: "", unitPrice: "", quantity: "", discount: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-invoice",
        data,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  console.log(data);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Invoice Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="text-xl font-semibold col-span-full">
            Seller Details
          </h2>
          <input
            type="text"
            name="sellerName"
            placeholder="Seller Name"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="sellerAddress"
            placeholder="Seller Address"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="sellerPan"
            placeholder="Seller PAN"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="sellerGst"
            placeholder="Seller GST"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />

          <h2 className="text-xl font-semibold col-span-full">
            Billing Details
          </h2>
          <input
            type="text"
            name="billingName"
            placeholder="Billing Name"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="billingAddress"
            placeholder="Billing Address"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />

          <h2 className="text-xl font-semibold col-span-full">
            Shipping Details
          </h2>
          <input
            type="text"
            name="shippingName"
            placeholder="Shipping Name"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="shippingAddress"
            placeholder="Shipping Address"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />

          <h2 className="text-xl font-semibold col-span-full">Order Details</h2>
          <input
            type="text"
            name="placeOfSupply"
            placeholder="Place of Supply"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="placeOfDelivery"
            placeholder="Place of Delivery"
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="orderNo"
            placeholder="Order No."
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="invoiceNo"
            placeholder="Invoice No."
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
                <h2 className="text-xl font-semibold text-left mb-2">Order Date</h2>
                <input
                type="date"
                name="orderDate"
                placeholder="Order Date"
                onChange={handleInputChange}
                className="input input-bordered w-full"
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold text-left mb-2">
                Invoice Date
                </h2>
                <input
                type="date"
                name="invoiceDate"
                placeholder="Invoice Date"
                onChange={handleInputChange}
                className="input input-bordered w-full"
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold text-left mb-2">
                Reverse Charge
                </h2>
                <select
                name="reverseCharge"
                onChange={handleInputChange}
                className="select select-bordered w-full"
                >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                </select>
            </div>
          </div>
        <div className="space-x-4">
          <button
            type="button"
            onClick={addItem}
            className="btn btn-primary mt-4"
          >
            Add Item
          </button>
          {data.items.map((item, index) => (
            <div key={index} className="space-y-2 mt-4">
              <h2 className="text-xl font-semibold">Item {index + 1}</h2>
              <textarea
                onChange={(e) => handleItemChange(index, e)}
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered textarea-md w-full"
              ></textarea>
              <div className="grid grid-cols-3 gap-6">
              <input
                type="number"
                name="unitPrice"
                placeholder="Unit Price"
                onChange={(e) => handleItemChange(index, e)}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                onChange={(e) => handleItemChange(index, e)}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount"
                onChange={(e) => handleItemChange(index, e)}
                className="input input-bordered w-full"
              />
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-success mt-6">
            Generate Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
