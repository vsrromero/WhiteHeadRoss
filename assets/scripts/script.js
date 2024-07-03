const questions = [
    { question: "When I operate new equipment I generally:", options: ["read the instructions first", "listen to an explanation from someone who has used it before", "go ahead and have a go, I can figure it out as I use it"], ids: [1, 2, 3] },
    { question: "When I need directions for travelling I usually:", options: ["look at a map", "ask for spoken directions", "follow my nose and maybe use a compass"], ids: [1, 2, 3] },
    { question: "When I cook a new dish, I like to:", options: ["follow a written recipe", "call a friend for an explanation", "follow my instincts, testing as I cook"], ids: [1, 2, 3] },
    // Adicione mais perguntas conforme necessário
];

let answers = [];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCarouselItems() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';

    questions.forEach((q, index) => {
        const shuffledOptions = shuffleOptions(q.options, q.ids, index);
        
        const itemDiv = document.createElement('div');
        itemDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        itemDiv.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h3>${q.question}</h3>
                <div class="options">
                    ${shuffledOptions}
                </div>
                <div class="button-group mt-3">
                    ${index !== 0 ? `<button class="btn btn-secondary mr-2" onclick="prevQuestion()">Back</button>` : ''}
                    ${index !== questions.length - 1 ? `<button class="btn btn-primary next-btn" onclick="nextQuestion(${index})" disabled>Next</button>` : `<button class="btn btn-success finish-btn" onclick="finishTest()" disabled>Finish</button>`}
                </div>
            </div>
        `;
        carouselInner.appendChild(itemDiv);
    });

    addRadioListeners();
}

function shuffleOptions(options, ids, questionIndex) {
    const shuffledIndexes = shuffle([0, 1, 2]);
    return shuffledIndexes.map((shuffledIndex, originalIndex) => `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="question${questionIndex}" value="${ids[shuffledIndex]}" id="question${questionIndex}option${originalIndex}">
            <label class="form-check-label" for="question${questionIndex}option${originalIndex}">
                ${options[shuffledIndex]}
            </label>
        </div>
    `).join('');
}

function nextQuestion(index) {
    $('#questionnaire').carousel('next');
}

function prevQuestion() {
    $('#questionnaire').carousel('prev');
}

const learningStylesExplanation = {
    1: "Someone with a Visual learning style has a preference for seen or observed things, including pictures, diagrams, demonstrations, displays, handouts, films, flip-chart, etc. These people will use phrases such as ‘show me’, ‘let’s have a look at that’ and will be best able to perform a new task after reading the instructions or watching someone else do it first. These are the people who will work from lists and written directions and instructions.",
    2: "Someone with an Auditory learning style has a preference for the transfer of information through listening: to the spoken word, of self or others, of sounds and noises. These people will use phrases such as ‘tell me’, ‘let’s talk it over’ and will be best able to perform a new task after listening to instructions from an expert. These are the people who are happy being given spoken instructions over the telephone, and can remember all the words to songs that they hear!",
    3: "Someone with a Kinaesthetic learning style has a preference for physical experience - touching, feeling, holding, doing, practical hands-on experiences. These people will use phrases such as ‘let me try’, ‘how do you feel?’ and will be best able to perform a new task by going ahead and trying it out, learning as they go. These are the..."
};

function finishTest() {
    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    selectedAnswers.forEach(answer => {
        answers.push(parseInt(answer.value));
    });

    const counts = [0, 0, 0];
    answers.forEach(answer => counts[answer - 1]++);

    const maxCount = Math.max(...counts);
    const learningStyle = counts.indexOf(maxCount) + 1;

    let learningStyleText;
    switch (learningStyle) {
        case 1:
            learningStyleText = "Your learning style is VISUAL.";
            break;
        case 2:
            learningStyleText = "Your learning style is AUDITORY.";
            break;
        case 3:
            learningStyleText = "Your learning style is KINAESTHETIC.";
            break;
        default:
            learningStyleText = "Your learning style could not be determined.";
    }

    const resultText = document.getElementById('resultText');
    resultText.innerHTML = `<h2>${learningStyleText}</h2><p>${learningStylesExplanation[learningStyle]}</p>`;

    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Adicionar o logo
    const logo = new Image();
    logo.src = 'assets/imgs/logo.png';
    const logoHeight = 30; // Ajuste conforme necessário
    const logoWidth = (logoHeight / logo.height) * logo.width;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logo, 'PNG', logoX, 10, logoWidth, logoHeight);

    // Adicionando título
    const title = document.querySelector('#resultText h2').textContent;
    doc.setFontSize(16);
    
    // Centralizando o título
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth) / 2;
    
    doc.text(title, titleX, 50, { align: 'center' });

    // Adicionando o texto do resultado com formatação
    const content = document.querySelector('#resultText p').textContent;
    const splitText = doc.splitTextToSize(content, 250); // Divide o texto em linhas, ajustando ao tamanho da página
    console.log(pageWidth);
    doc.setFontSize(12);
    doc.text(splitText, 10, 60); // Começa a 30px da parte superior da página

    // Adicionando as perguntas e respostas escolhidas
    let yPos = 90; // Posição vertical inicial para as perguntas
    questions.forEach((q, index) => {
        const selectedAnswer = answers[index];
        const questionText = `${index + 1}. ${q.question}`;

        const options = q.options.map((option, idx) => {
            if (q.ids[idx] === selectedAnswer) {
                return `• ${capitalizeFirstLetter(option)}`; // Marca a resposta escolhida
            } else {
                return `  ${capitalizeFirstLetter(option)}`;
            }
        });

        const questionWithAnswer = [questionText, ...options].join('\n');
        doc.setFont('helvetica', 'normal'); // Define a fonte e o estilo para normal
        doc.text(questionWithAnswer, 10, yPos);
        yPos += doc.getTextDimensions(questionWithAnswer).h + 20; // Aumenta o espaço entre perguntas
    });

    doc.save('VAK_Learning_Styles_Result.pdf');
}



function restartTest() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    answers = [];
    createCarouselItems();
    $('#confirmRestartModal').modal('hide');
}

document.getElementById('startTest').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('questionnaire').style.display = 'block';
    createCarouselItems();
});

document.getElementById('downloadPDF').addEventListener('click', downloadPDF);

document.getElementById('restartTest').addEventListener('click', () => {
    $('#confirmRestartModal').modal('show');
});

document.getElementById('confirmRestart').addEventListener('click', restartTest);

function addRadioListeners() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const name = event.target.name;
            const carouselItem = document.querySelector(`input[name="${name}"]`).closest('.carousel-item');
            const nextButton = carouselItem.querySelector('.next-btn');
            const finishButton = carouselItem.querySelector('.finish-btn');
            if (nextButton) {
                nextButton.disabled = false;
            }
            if (finishButton) {
                finishButton.disabled = false;
            }
        });
    });
}
