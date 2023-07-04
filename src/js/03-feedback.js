
import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');


const LS = 'feedback-form-state'

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(LS, JSON.stringify(formData));
};


const loadFormState = () => {
  const savedData = localStorage.getItem(LS);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};


const resetFormState = () => {
  localStorage.removeItem(LS);
  emailInput.value = '';
  messageInput.value = '';
};


const handleFormInput = throttle(saveFormState, 500);


form.addEventListener('input', handleFormInput);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log({
    email: emailInput.value,
    message: messageInput.value
  });
  resetFormState();
});

loadFormState();
