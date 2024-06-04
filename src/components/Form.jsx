import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../App';



const Form = () => {

    const [token, setToken] = useState(null);
    const [positions, setPositions] = useState(null);


    function fetchData(API, query, setter) {
      axios.get(API + query).then(res => {
        if (res.status === 200) {
          setter(res.data);
        }
      })
    }

    

    useEffect(() => {
      fetchData(API, '/token', setToken);
      fetchData(API, '/positions', setPositions)
    }, [])

    useEffect(() => {
      const intervalId = setInterval(() => fetchData(API, '/token', setToken), 2400000);
      return () => clearInterval(intervalId);
    }, [])

    return (
      <section className='form-section'>
        <h2 className='form-section-heading'>Working with POST request</h2>

        <form className='form'>
          <input className='form-input' type="text" placeholder='Your name'/>
          <input className='form-input' type="email" placeholder='Email' />
          <input className='form-input' type="tel" placeholder='Phone' />

          <div className='radio-container'>
            <p>Select your position</p>
            {positions && positions.positions.map(i => (
              <div key={i.id} className='radio-wrapper'>
                <label className='radio'>
                  <input type="radio" name="position" value={i.id}/>
                  {i.name}
                  <span></span>
                </label>
              </div>
            ))}
          </div>

          
          <label className="custom-file-upload">
              <input type="file"/>
              <span>Upload</span>
              <span>Upload your photo</span>
          </label>

          <button className='form-button' disabled={true}>Sign up</button>
        </form>

      </section>
    )
}

export default Form