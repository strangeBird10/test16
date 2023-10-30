(function () {
    const Choose = {
        quizzes: [],
        init(){
            checkUserData ()

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.site/get-quizzes', false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                   this.quizzes = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html'
                }
                this.processQuizzes ();
            } else {
                location.href = 'index.html'
            }
        },
        processQuizzes () {
            const chooseOptionsElement = document.getElementById('choose-options');
            if (this.quizzes && this.quizzes.length >0) {
                this.quizzes.forEach(quiz => {
                    const that = this;
                    const chooseOptionElement = document.createElement('div');
                    chooseOptionElement.className = 'choose-option';
                    chooseOptionElement.setAttribute('data-id', quiz.id);
                    chooseOptionElement.onclick = function () {
                        that.chooseQuiz(this);
                    }

                    const chooseOptionTextElement = document.createElement('div');
                    chooseOptionTextElement.className = 'choose-option-text';
                    chooseOptionTextElement.innerText = quiz.name;

                    const chooseOptionArrowElement = document.createElement('div');
                    chooseOptionArrowElement.className = 'choose-option-arrow';

                    const chooseOptionImageElement = document.createElement('img');
                    chooseOptionImageElement.setAttribute('src', 'images/arrow.png');
                    chooseOptionImageElement.setAttribute('alt', 'arrow');

                    chooseOptionArrowElement.appendChild(chooseOptionImageElement);
                    chooseOptionElement.appendChild(chooseOptionTextElement);
                    chooseOptionElement.appendChild(chooseOptionArrowElement);

                    chooseOptionsElement.appendChild(chooseOptionElement);

                })
            }
        },
        chooseQuiz (element) {
            const dataId = element.getAttribute('data-id');
            if(dataId) {
                location.href = 'test.html' + location.search + '&id=' + dataId;
            }
        }
    }
    Choose.init();
}) ()