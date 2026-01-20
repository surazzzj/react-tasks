const HeavyComponent = () => {
  return (
    <div style={{ padding: "20px", background: "#eee" }}>
      <h2>Heavy Component Loaded</h2>
      <p>This component was lazy loaded!</p>
    </div>
  );
};

export default HeavyComponent;
