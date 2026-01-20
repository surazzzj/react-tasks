import React, { Suspense, useState } from "react";

const HeavyComponent = React.lazy(() => import("./component/HeavyComponent"));

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>React Lazy Loading Demo</h1>

      <button onClick={() => setShow(true)}>
        Load Component
      </button>

      {show && (
        <Suspense fallback={<h3>Loading component...</h3>}>
          <HeavyComponent />
        </Suspense>
      )}

    </div>
  );
};

export default App;
