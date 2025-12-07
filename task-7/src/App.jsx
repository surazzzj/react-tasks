import { useContext} from 'react';
import { ThemeCtx } from './ThemeContext.jsx/ThemeCtx';
import '../src/App.css'

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeCtx);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      transition: 'all 0.3s ease'
    },
    title: {
      color: theme === 'light' ? '#333' : '#fff',
      marginBottom: '30px',
      fontSize: '28px',
      transition: 'color 0.3s ease'
    },
    button: {
      padding: '15px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      backgroundColor: theme === 'light' ? '#007bff' : '#ff6b6b',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    indicator: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: theme === 'light' ? '#ffd700' : '#4d4d4d',
      border: theme === 'light' ? '2px solid #ffaa00' : '2px solid #666'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Current Theme: <span style={{ color: theme === 'light' ? '#ff6b6b' : '#4dabf7' }}>
          {theme.toUpperCase()}
        </span>
      </h1>

      <button
        style={styles.button}
        onClick={toggleTheme}
      >
        <span style={styles.indicator}></span>
        Click to Toggle Theme
        <span style={{ fontSize: '24px' }}>
          {theme === 'light' ? ' 🌙' : ' ☀️'}
        </span>
      </button>

      <p style={{
        color: theme === 'light' ? '#666' : '#aaa',
        marginTop: '30px',
        fontSize: '14px'
      }}>
        Click the button to switch between Light and Dark themes
      </p>
    </div>
  );
};

export default App;