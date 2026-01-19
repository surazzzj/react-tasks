import React, { useState } from "react";

export default function DropUpload54() {
  const [files, setFiles] = useState([]);
  function onDrop(e) { e.preventDefault(); setFiles(Array.from(e.dataTransfer.files)); }
  return (<div onDrop={onDrop} onDragOver={e => e.preventDefault()} style={{ padding: 20, border: "2px dashed #ccc" }}>
    Drop files here
    <div>{files.map(f => <div key={f.name}>{f.name}</div>)}</div>
  </div>);
}
