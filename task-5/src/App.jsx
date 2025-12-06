// Form Validation

import { useState } from 'react'
import '../src/App.css';

const FormValidation = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showLogin, setShowLogin] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);
  const [submittedDataList, setSubmittedDataList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const SubmitHandler = (e) => {
    e.preventDefault();

    const submission = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      ...formData
    };
    setSubmittedData(submission);
    setSubmittedDataList(prev => [submission, ...prev]);

    setFormData({
      name: '',
      email: '',
      password: ''
    })

    console.log('Form submitted:', submission);
  }

  const clearSubmittedData = () => {
    setSubmittedData(null);
    setSubmittedDataList([]);
  }

  return (
    <>
      <form onSubmit={SubmitHandler} id='parent'>
        <h3>Contact form</h3>
        {!showLogin && <input type="text" name="name" value={formData.name} placeholder='Enter Name' onChange={handleChange} />}
        <input type="text" name='email' value={formData.email} placeholder='Enter Email' onChange={handleChange} />
        <input type="text" name='password' value={formData.password} placeholder='Enter Password' onChange={handleChange} />
        <button type="submit">Submit</button>
        <p>{showLogin ? "Don't have an account?" : "Already have an account?"} <span onClick={() => setShowLogin(!showLogin)}>{showLogin ? "Sign up" : "Sign in"}</span></p>
      </form>

      {submittedData && (
        <div id='showdetails'>
          <h4>
            <i className="fas fa-check-circle"></i>
            Form Submitted Successfully!
          </h4>

          <div id='primary'>
            <h5>Submitted Data:</h5>

            {!showLogin && submittedData.name && (
              <p>
                <strong>Name:</strong> {submittedData.name}
              </p>
            )}

            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>

            <p>
              <strong>Password:</strong> {'*'.repeat(submittedData.password.length)}
            </p>

            <p id='para4'>
              <strong>Submitted at:</strong> {submittedData.timestamp}
            </p>

            <button onClick={clearSubmittedData}>
              Clear Data
            </button>
          </div>
        </div>
      )}

      {/* Display All Submissions History */}
      {submittedDataList.length > 0 && (
        <div id='showdatahistory'>
          <h4>
            <i className="fas fa-history"></i>
            Submission History ({submittedDataList.length})
          </h4>

          <div id='divprimary'>
            {submittedDataList.map((data) => (
              <div id='inner-pri' key={data.id} >
                <div id='ano-inner-pri'>
                  <div id='sec-ano-inner-pri'>
                    {data.name && (
                      <span id='span_pri'>{data.name}</span>
                    )}
                    <span id='span_sec'>{data.email}</span>
                  </div>
                  <span id='ano_inner_pri_span'>
                    {new Date(data.id).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {submittedDataList.length > 1 && (
            <button onClick={() => setSubmittedDataList([])}  >
              Clear All History
            </button>
          )}

        </div>
      )}
    </>
  )
}

export default FormValidation