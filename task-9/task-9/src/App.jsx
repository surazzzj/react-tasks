import React from "react";

// Custom hook for checkbox group logic
function useCheckboxGroup(options) {
  const [selected, setSelected] = React.useState(new Set());

  const toggle = (option) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(prev => prev.size === options.length ? new Set() : new Set(options));
  };

  const select = (option) => {
    setSelected(prev => new Set([...prev, option]));
  };

  const deselect = (option) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.delete(option);
      return next;
    });
  };

  const clear = () => setSelected(new Set());

  const isSelected = (option) => selected.has(option);
  const allSelected = selected.size === options.length;
  const selectedCount = selected.size;

  return {
    selected: Array.from(selected),
    selectedSet: selected,
    toggle,
    toggleAll,
    select,
    deselect,
    clear,
    isSelected,
    allSelected,
    selectedCount
  };
}

export default function CheckboxGroup21() {
  const options = ["React", "Vue", "Angular", "Svelte", "Ember", "Preact"];
  
  const {
    selected,
    toggle,
    toggleAll,
    isSelected,
    allSelected,
    selectedCount,
    clear
  } = useCheckboxGroup(options);

  return (
    <div className="container">
      <h1>Multi-Framework Selector</h1>
      <p className="subtitle">Choose the JavaScript frameworks you work with</p>

      <div className="controls">
        <button onClick={toggleAll} className="btn btn-primary">
          {allSelected ? "Deselect All" : "Select All"}
        </button>
        <button onClick={clear} className="btn btn-secondary">
          Clear All
        </button>
        <div className="counter">
          {selectedCount} / {options.length}
        </div>
      </div>

      <div className="options-list">
        {options.map(option => (
          <div
            key={option}
            className={`option ${isSelected(option) ? "selected" : ""}`}
            onClick={() => toggle(option)}
          >
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={isSelected(option)}
                readOnly
                className="checkbox"
              />
              <div className="checkmark">
                {isSelected(option) && "✓"}
              </div>
            </div>
            <span className="option-label">{option}</span>
          </div>
        ))}
      </div>

      <div className="selection-panel">
        <h3>Selected ({selectedCount})</h3>
        {selected.length === 0 ? (
          <p className="empty-state">No selections yet</p>
        ) : (
          <div className="chips">
            {selected.map(option => (
              <span key={option} className="chip">
                {option}
                <button onClick={() => toggle(option)} className="chip-remove">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        h1 {
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #718096;
          margin-bottom: 2rem;
        }

        .controls {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #4299e1;
          color: white;
        }

        .btn-primary:hover {
          background: #3182ce;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btn-secondary:hover {
          background: #cbd5e0;
        }

        .counter {
          margin-left: auto;
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
        }

        .options-list {
          display: grid;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .option {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option:hover {
          border-color: #cbd5e0;
          background: #f7fafc;
        }

        .option.selected {
          border-color: #4299e1;
          background: #ebf8ff;
        }

        .checkbox-container {
          position: relative;
          margin-right: 1rem;
        }

        .checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          width: 24px;
          height: 24px;
          border: 2px solid #cbd5e0;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .option.selected .checkmark {
          background: #4299e1;
          border-color: #4299e1;
          color: white;
        }

        .option-label {
          font-size: 1rem;
          font-weight: 500;
          color: #2d3748;
        }

        .selection-panel {
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
        }

        .selection-panel h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #4a5568;
        }

        .empty-state {
          color: #a0aec0;
          font-style: italic;
          margin: 0;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 50px;
          font-weight: 500;
          color: #2d3748;
        }

        .chip-remove {
          background: none;
          border: none;
          color: #e53e3e;
          cursor: pointer;
          font-size: 1.2rem;
          line-height: 1;
          padding: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chip-remove:hover {
          background: #fed7d7;
        }
      `}</style>
    </div>
  );
}