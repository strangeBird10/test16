(function () {
    const Answers = {
            testId: null,
            nameTest: null,
            userInfo: null,
            name: null,
            lastName: null,
            email: null,
            currentQuestionIndex: 1,
            testQuestions: [],
            quiz: null,
            correctAnswers: [],
            init() {
                const url = new URL(location.href);
                this.testId = url.searchParams.get('id');
                this.name = url.searchParams.get('name');
                this.lastName = url.searchParams.get('lastName');
                this.email = url.searchParams.get('email');
                if (this.testId) {
                    this.quiz = this.getData(this.testId, 'https://testologia.site/get-quiz?id=');
                    this.correctAnswers = this.getData(this.testId, 'https://testologia.site/get-quiz?id=');
                    console.log(this.quiz);
                } else {
                    location.href = 'index.html';
                }
                this.startGoAnswer();
            },

            startGoAnswer() {
                const that = this;
                that.nameTest = document.getElementById('name-test');
                that.nameTest.innerText = this.quiz.name;
                that.userInfo = document.getElementById('name-user');
                that.userInfo.innerText = this.name + '' + this.lastName + '' + ',' + this.email;
                that.testQuestions = that.quiz.questions;
                this.showAnswer();
            },
        showAnswer() {
                const idJSON = sessionStorage.getItem('idArray');
                const id = JSON.parse(idJSON);

                if(this.quiz && this.quiz.questions.length > 0) {
                    this.quiz.questions.forEach((questionItm, questionIdx) => {
                        const answerQuestion = document.getElementById('answers-item');
                        const questionTitle = document.createElement('div');
                        questionTitle.className = 'name-question';
                        questionTitle.innerHTML = `span>Вопрос${questionIdx + 1} </span>${questionItm.question}`;

                        answerQuestion.appendChild(questionTitle);

                        questionItm.answers.forEach((answersItm, answersIdx) => {
                            let inputId = answersItm.id;
                            const optionElement = document.createElement('div');
                            optionElement.className = 'answers-various';
                            const inputElement = document.createElement('input');
                            inputElement.setAttribute('type', 'radio');
                            inputElement.setAttribute('name', `answer_${questionIdx}`);
                            inputElement.setAttribute ('id', inputId);

                            const labelElement = document.createElement('label');
                            labelElement.setAttribute('for', inputId);
                            labelElement.innerText = `${answersItm.answer}`;

                            optionElement.appendChild(inputElement);
                            optionElement.appendChild(labelElement);
                            answerQuestion.appendChild(optionElement);

                            optionElement.style.pointerEvents = 'none';
                            if (this.correctAnswers.includes(answersItm.id)) {
                                inputElement.setAttribute('checked', 'checked');

                            }
                            if (id.includes(answersItm.id)) {
                                if(answersItm.answer === this.correctAnswers[questionIdx]) {
                                    optionElement.classList.add('correct');
                                } else {
                                    optionElement.classList.add ('incorrect');
                                }
                            }

                        })

                    })
                }
        },
        getData(testId,url) {
                const xhr = new XMLHttpRequest();
                xhr.open ('GET', url + testId, false);
                xhr.send ();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        return JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = '#/'
                    }

                } else {
                    location.href = '#/'
                }
        }

        };
        const answerLink = document.getElementById('back-result');
        answerLink.onclick = function () {
            location.href = 'result.html' + location.search;
        };

        Answers.init();
})();
