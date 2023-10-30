(function () {
    const Result = {
        init() {
            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score') + '/' + url.searchParams.get('total');
            this.showAnswers();
        },

        showAnswers() {
            const showAnswerButton = document.getElementById('result-answers');
            showAnswerButton.onclick = function () {
                location.href = 'answers.html' + location.search;
            }
        }
    }
    Result.init();
})();
