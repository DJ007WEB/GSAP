

const question = document.querySelectorAll('.question');

console.log(question);

question.forEach((ques,i) => {
    
    ques.addEventListener('click' , () => {
        question[i].classList.toggle("open");
    })
})