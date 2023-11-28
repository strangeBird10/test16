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
        userAnswers: [],
        init() {
            const userAnswersJSON = sessionStorage.getItem('userAnswers');
            this.userAnswers = JSON.parse(userAnswersJSON) || [];

            const url = new URL(location.href);
            this.testId = url.searchParams.get('id');
            this.name = url.searchParams.get('name');
            this.lastName = url.searchParams.get('lastName');
            this.email = url.searchParams.get('email');

            if (this.testId) {
                this.quiz = this.getData(this.testId, 'https://testologia.site/get-quiz?id=');
                this.correctAnswers = this.getData(this.testId, 'https://testologia.site/get-quiz-right?id=');

                this.startGoAnswer();
            } else {
                location.href = 'index.html';
            }
        },
        startGoAnswer() {
            const nameTest = document.getElementById('name-test');
            nameTest.innerText = this.quiz.name;

            const userInfo = document.getElementById('name-user');
            userInfo.innerText = `${this.name} ${this.lastName}, ${this.email}`;
            this.showAnswer();
        },
        showAnswer() {
            const answerItems = document.getElementById('answers-item');
            answerItems.innerHTML = '';

            if (this.quiz && this.quiz.questions.length > 0) {
                this.quiz.questions.forEach((questionItm, questionIdx) => {
                    const answerQuestion = document.getElementById('answers-item');
                    const questionTitle = document.createElement('div');
                    questionTitle.className = 'name-question';
                    questionTitle.innerHTML = `<span>Вопрос ${questionIdx + 1} : </span>${questionItm.question}`;

                    answerQuestion.appendChild(questionTitle);

                    questionItm.answers.forEach((answersItm, answersIdx) => {
                        const inputId = answersItm.id;
                        const optionElement = document.createElement('div');
                        optionElement.className = 'answers-option';
                        const inputElement = document.createElement('input');
                        inputElement.setAttribute('type', 'radio');
                        inputElement.setAttribute('name', `answer_${questionIdx}`);
                        inputElement.setAttribute('id', inputId);

                        const labelElement = document.createElement('label');
                        labelElement.setAttribute('for', inputId);
                        labelElement.innerText = `${answersItm.answer}`;

                        optionElement.appendChild(inputElement);
                        optionElement.appendChild(labelElement);
                        answerQuestion.appendChild(optionElement);

                        const isCorrect = this.correctAnswers[questionIdx] === answersItm.id;
                        const isSelected = this.userAnswers.includes(answersItm.id);

                        if (isSelected) {
                            inputElement.setAttribute('checked', 'checked');
                            if (isCorrect) {
                                optionElement.classList.add('correct');
                            } else {
                                optionElement.classList.add('incorrect');
                            }
                        }

                        optionElement.style.pointerEvents = 'none';
                    });
                });
            }
        },
        getData(testId, url) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url + testId, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    return JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html'
                }

            } else {
                location.href = 'index.html'
            }
        }

    };
    const answerLink = document.getElementById('back-result');
    answerLink.onclick = function () {
        location.href = 'result.html' + location.search;
    };

    Answers.init();
})();



