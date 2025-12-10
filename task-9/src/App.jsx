import React from "react";
import './App.css'

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

    </div>
  );
}