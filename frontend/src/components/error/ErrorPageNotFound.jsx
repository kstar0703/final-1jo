import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPageNotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.errorContainer}>
        <h1 style={styles.heading}>404 Not Found</h1>
        <p style={styles.text}>
          Sorry, the page you are looking for might be in another castle.
        </p>
        <Link to="/" style={styles.link}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: '3em',
    color: '#d9534f',
    margin: '10px 0',
  },
  text: {
    fontSize: '1.2em',
    margin: '10px 0',
  },
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    backgroundColor: '#5bc0de',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontSize: '1.2em',
    marginTop: '10px',
  },
};

export default ErrorPageNotFound;
