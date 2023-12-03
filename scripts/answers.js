(function () {
    const Answers = {
        testId: null,
        nameTest: null,
        userInfo: null,
        currentQuestionIndex: 1,
        testQuestions: [],
        quiz: null,
        correctAnswers: [],
        userAnswers: [],
        init() {
            this.getUserAnswers();
            const url = new URL(location.href);
            this.testId = url.searchParams.get('id');
            if (this.testId) {
                this.getQuiz(this.testId);
                this.getCorrectAnswers(this.testId);
                this.startGoAnswer();
            } else {
                location.href = 'index.html';
            }
        },
        getUserAnswers() {
            const userAnswersJSON = sessionStorage.getItem('userAnswers');
            this.userAnswers = JSON.parse(userAnswersJSON) || [];

        },
        startGoAnswer() {
            const url = new URL(location.href);
            const {name, lastName, email} = url.searchParams;
            const nameTest = document.getElementById('name-test');
            nameTest.innerText = this.quiz.name;

            const userInfo = document.getElementById('name-user');
            userInfo.innerText = `${name} ${lastName}, ${email}`;
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
        getQuiz() {
            const url = 'https://testologia.site/get-quiz?id=' + this.testId;
            this.quiz = this.getData(url);
        },
        getCorrectAnswers() {
            const url = 'https://testologia.site/get-quiz-right?id=' + this.testId;
            this.correctAnswers = this.getData(url);
        },
        getData(url, method = 'GET') {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, false);
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



