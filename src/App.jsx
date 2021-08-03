import './App.css';
import React, { useReducer, useState, useEffect } from 'react';

const initialState = {
  step: 1,
  step_1: {
      name: '',
      email: '',
  },
  step_2: {
      city: '',
      address: '',
  },
  step_3: {
      img: 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
      case 'NEXT_STEP':
          return {
              ...state,
              step: state.step + 1
          };
      case 'PREV_STEP':
          return {
              ...state,
              step: state.step - 1
          };
      case 'CHANGE_STEP_1':
          return {
              ...state,
              step_1: {...state.step_1, ...action.payload}
          };
      case 'CHANGE_STEP_2':
          return {
              ...state,
              step_2: {...state.step_2, ...action.payload}
          };
      case 'CHANGE_STEP_3':
          return {
              ...state,
              step_3: {...state.step_3, ...action.payload}
          };
      default:
          return state;
  }
};

const Step1 = ( { dispatch, values } ) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'CHANGE_STEP_1', payload: {[name]: value}})
    };
  return (
      <div>
          <label>
              Name
              <input value={values.name} type="text" name="name" onChange={handleChange}/>
          </label>
          <label>
              Email
              <input value={values.email} type="text" name="email" onChange={handleChange}/>
          </label>
      </div>
  )
};
const Step2 = ( { dispatch, values } ) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'CHANGE_STEP_2', payload: {[name]: value}})
    };
    return (
        <div>
            <label>
                City
                <input value={values.city} type="text" name="city" onChange={handleChange}/>
            </label>
            <label>
                Address
                <input value={values.address} type="text" name="address" onChange={handleChange}/>
            </label>
        </div>
    )
};
const Step3 = ( { dispatch, value } ) => {
    const [imgUrl, setImgUrl] = useState(value);
    useEffect(() => {
        return () => dispatch({type: 'CHANGE_STEP_3', payload: {img: imgUrl}})
    });
    const handleChange = (e) => {
        const file  = e.target.files[0];
        const fileReader = new FileReader();
          fileReader.onload = () => setImgUrl(fileReader.result);
          fileReader.readAsDataURL(file)
    };
    return (
        <div>
            <img className="avatarIcon" src={imgUrl} alt="avatar"/>
            <input onChange={handleChange} type="file" accept=".jpg, .png, .jpeg" name="img"/>
        </div>
    )
};
const Step4 = ( { state } ) => {
    return (
        <div>
            <img className="avatarIcon" src={state.step_3.img} alt=""/>
            <p>Name: {state.step_1.name}</p>
            <p>Email: {state.step_1.email}</p>
            <p>City: {state.step_2.city}</p>
            <p>Address: {state.step_2.address}</p>
        </div>
    )
};

const App = () => {
    const  [state, dispatch] = useReducer(reducer, initialState);
    const handleNextStep = () => dispatch({type: 'NEXT_STEP'});
    const handlePrevStep = () => dispatch({type: 'PREV_STEP'});
    return (
    <>
        <h3>State: {state.step}</h3>
        <div>
            {state.step === 1 && <Step1 dispatch={dispatch} values={state.step_1}/>}
            {state.step === 2 && <Step2 dispatch={dispatch} values={state.step_2}/>}
            {state.step === 3 && <Step3 dispatch={dispatch} value={state.step_3.img}/>}
            {state.step === 4 && <Step4 state={state} />}
        </div>
        <footer>
            { state.step > 1 && <button onClick={handlePrevStep}>Previous</button> }
            { state.step < 4 && <button onClick={handleNextStep}>Next</button> }
            { state.step === 4 && <button>Submit</button> }
        </footer>
    </>
  );
};

export default App;
