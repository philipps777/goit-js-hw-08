
import throttle from 'lodash.throttle';


const formEl = document.querySelector('.feedback-form');
// const emailInput = form.querySelector('input[name="email"]');
// const messageInput = form.querySelector('textarea[name="message"]');


const LS = 'feedback-form-state';

let formData = {};

const saveFormState = (e) => {
  formData[e.target.name] = e.target.value.trim();
  // const formData = {
  //   email: emailInput.value,
  //   message: messageInput.value
  // };
  localStorage.setItem(LS, JSON.stringify(formData));
};


// const loadFormState = () => {
//   const savedData = localStorage.getItem(LS);
//   if (savedData) {
//     const formData = JSON.parse(savedData);
//     emailInput.value = formData.email;
//     messageInput.value = formData.message;
//   }
// };


const resetFormState = () => {
  localStorage.removeItem(LS);
  formEl.reset();
  // emailInput.value = '';
  // messageInput.value = '';
};


const handleFormInput = throttle(saveFormState, 500);


form.addEventListener('input', handleFormInput);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(formData);
  formData = {};
  // console.log({
  //   email: emailInput.value,
  //   message: messageInput.value
  // });
  resetFormState();
});

// loadFormState();

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