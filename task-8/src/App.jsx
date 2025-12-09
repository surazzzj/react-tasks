import React, { useState, useRef, useEffect } from "react";
import '../src/App.css'

export default function FilePreview16() {
  const [src, setSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Revoke previous URL
    if (src) {
      URL.revokeObjectURL(src);
    }

    setSrc(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const onChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (src) {
      URL.revokeObjectURL(src);
    }
    setSrc(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  // Add drag and drop event listeners
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (dropZone) {
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("dragleave", handleDragLeave);
      dropZone.addEventListener("drop", handleDrop);

      return () => {
        dropZone.removeEventListener("dragover", handleDragOver);
        dropZone.removeEventListener("dragleave", handleDragLeave);
        dropZone.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (src) {
        URL.revokeObjectURL(src);
      }
    };
  }, [src]);

  return (
    <div className="file-preview-container">
      <h2 className="title">Image Preview</h2>
      <p className="subtitle">Upload an image to preview it</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden-input"
      />

      <div
        ref={dropZoneRef}
        className={`drop-zone ${isDragOver ? "drag-over" : ""} ${
          src ? "has-image" : ""
        }`}
      >
        {!src ? (
          <>
            <div className="upload-icon">📁</div>
            <div className="upload-text">
              <p>
                <strong>Click to upload</strong> or drag and drop
              </p>
              <p className="file-types">PNG, JPG, GIF, WEBP (Max 5MB)</p>
            </div>
            <button className="browse-btn" onClick={handleButtonClick}>
              Browse Files
            </button>
          </>
        ) : (
          <div className="preview-container">
            <div className="image-wrapper">
              <img
                src={src}
                alt="Preview"
                className="preview-image"
              />
              <div className="image-overlay">
                <button
                  className="remove-btn"
                  onClick={handleRemove}
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="file-info">
              <p className="file-name">{fileName}</p>
              <div className="actions">
                <button
                  className="change-btn"
                  onClick={handleButtonClick}
                >
                  Change Image
                </button>
                <button
                  className="remove-btn-full"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {src && (
        <div className="hint">
          ✓ Image uploaded successfully. You can change or remove it.
        </div>
      )}

    </div>
  );
}