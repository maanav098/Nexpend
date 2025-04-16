import React from "react";
import { useState } from "react";
import "../Css/BillUpload.css"
const BillUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Processing...");

    // In a real implementation, you would send the file to your backend for OCR processing
    // For now, we'll simulate the request with a timeout
    try {
      // Simulating an API call
      setTimeout(() => {
        // Mock response with extracted data
        const mockData = {
          vendor: "Grocery Store ABC",
          date: "2025-04-10",
          total: "$78.95",
          items: [
            { name: "Milk", price: "$3.99" },
            { name: "Bread", price: "$2.49" },
            { name: "Eggs", price: "$4.99" },
            { name: "Vegetables", price: "$12.45" },
            { name: "Meat", price: "$24.99" },
            { name: "Snacks", price: "$8.99" },
            { name: "Beverages", price: "$15.99" },
            { name: "Tax", price: "$5.06" },
          ],
        };

        setExtractedData(mockData);
        setUploadStatus("Successfully processed bill");
        setIsUploading(false);
      }, 2000);
    } catch (error) {
      setUploadStatus("Error processing bill");
      setIsUploading(false);
    }
  };

  return (
    <div className="bill-upload-container">
      <h1>Upload Your Bill</h1>
      <p>Take a photo or upload an image of your receipt to extract data</p>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-area">
          <input
            type="file"
            id="bill-file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="bill-file" className="file-label">
            {preview ? "Change Image" : "Choose an Image"}
          </label>
        </div>

        {preview && (
          <div className="preview-container">
            <h3>Preview</h3>
            <img src={preview} alt="Bill preview" className="bill-preview" />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary upload-btn"
          disabled={isUploading || !file}
        >
          {isUploading ? "Processing..." : "Extract Data"}
        </button>

        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </form>

      {extractedData && (
        <div className="extracted-data-container card">
          <h2>Extracted Data</h2>
          <div className="extracted-info">
            <p>
              <strong>Vendor:</strong> {extractedData.vendor}
            </p>
            <p>
              <strong>Date:</strong> {extractedData.date}
            </p>
            <p>
              <strong>Total:</strong> {extractedData.total}
            </p>
          </div>

          <h3>Items</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {extractedData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-primary">Save to Database</button>
        </div>
      )}
    </div>
  );
};

export default BillUpload;
