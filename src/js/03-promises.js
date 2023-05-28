import Notiflix from 'notiflix';
const form = document.querySelector(".form")


const getPromise = (e) => {
  e.preventDefault();
  const delay = parseInt(e.currentTarget.delay.value);
  const step =  parseInt(e.currentTarget.step.value);
  const amount =  parseInt(e.currentTarget.amount.value);

  for (let i=0; i < amount; i++){
    createPromise(i+1, delay + i * step).then(({position, delay}) =>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  }
};

form.addEventListener("submit", getPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else { 
        reject({ position, delay });
      }
    }, delay);
   });
};
