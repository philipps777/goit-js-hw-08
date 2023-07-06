
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LS = 'feedback-form-state';

let formData = {};

const saveFormState = (e) => {
  formData[e.target.name] = e.target.value.trim(); 
  localStorage.setItem(LS, JSON.stringify(formData));
};



const resetFormState = () => {
  localStorage.removeItem(LS);  
};


const handleFormInput = throttle(saveFormState, 500);

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(formData);
  formData = {}; 
  resetFormState();
});



const onLoad = () => {
  try {
    const data = localStorage.getItem(LS);
    if(!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) =>{
      formEl.elements[key].value = val
    });
  } catch (error) {
    console.log(error.message);

  }
};

window.addEventListener("load", onLoad)