const questions = [
    { question: "When I operate new equipment I generally:", options: ["read the instructions first", "listen to an explanation from someone who has used it before", "go ahead and have a go, I can figure it out as I use it"], ids: [1, 2, 3] },
    { question: "When I need directions for travelling I usually:", options: ["look at a map", "ask for spoken directions", "follow my nose and maybe use a compass"], ids: [1, 2, 3] },
    { question: "When I cook a new dish, I like to:", options: ["follow a written recipe", "call a friend for an explanation", "follow my instincts, testing as I cook"], ids: [1, 2, 3] },
    { question: "If I am teaching someone something new, I tend to:", options: ["write instructions down for them", "give them a verbal explanation", "demonstrate first and then let them have a go"], ids: [1, 2, 3] },
    { question: "I tend to say:", options: ["watch how I do it", "listen to me explain", "you have a go"], ids: [1, 2, 3] },
    { question: "During my free time I most enjoy:", options: ["going to museums and galleries", "listening to music and talking to my friends", "playing sport or doing DIY"], ids: [1, 2, 3] },
    { question: "When I go shopping for clothes, I tend to:", options: ["imagine what they would look like on", "discuss them with the shop staff", "try them on and test them out"], ids: [1, 2, 3] },
    { question: "When I am choosing a holiday I usually:", options: ["read lots of brochures", "listen to recommendations from friends", "imagine what it would be like to be there"], ids: [1, 2, 3] },
    { question: "If I was buying a new car, I would:", options: ["read reviews in newspapers and magazines", "discuss what I need with my friends", "test-drive lots of different types"], ids: [1, 2, 3] },
    { question: "When I am learning a new skill, I am most comfortable:", options: ["watching what the teacher is doing", "talking through with the teacher exactly what I’m supposed to do", "giving it a try myself and work it out as I go"], ids: [1, 2, 3] },
    { question: "If I am choosing food off a menu, I tend to:", options: ["imagine what the food will look like", "talk through the options in my head or with my partner", "imagine what the food will taste like"], ids: [1, 2, 3] },
    { question: "When I listen to a band, I can’t help:", options: ["watching the band members and other people in the audience", "listening to the lyrics and the beats", "moving in time with the music"], ids: [1, 2, 3] },
    { question: "When I concentrate, I most often:", options: ["focus on the words or the pictures in front of me", "discuss the problem and the possible solutions in my head", "move around a lot, fiddle with pens and pencils and touch things"], ids: [1, 2, 3] },
    { question: "I choose household furnishings because I like:", options: ["their colours and how they look", "the descriptions the sales-people give me", "their textures and what it feels like to touch them"], ids: [1, 2, 3] },
    { question: "My first memory is of:", options: ["looking at something", "being spoken to", "doing something"], ids: [1, 2, 3] },
    { question: "When I am anxious, I:", options: ["visualise the worst-case scenarios", "talk over in my head what worries me most", "can’t sit still, fiddle and move around constantly"], ids: [1, 2, 3] },
    { question: "I feel especially connected to other people because of:", options: ["how they look", "what they say to me", "how they make me feel"], ids: [1, 2, 3] },
    { question: "When I have to revise for an exam, I generally:", options: ["write lots of revision notes and diagrams", "talk over my notes, alone or with other people", "imagine making the movement or creating the formula"], ids: [1, 2, 3] },
    { question: "If I am explaining to someone I tend to:", options: ["show them what I mean", "explain to them in different ways until they understand", "encourage them to try and talk them through my idea as they do it"], ids: [1, 2, 3] },
    { question: "I really love:", options: ["watching films, photography, looking at art or people watching", "listening to music, the radio or talking to friends", "taking part in sporting activities, eating fine foods and wines or dancing"], ids: [1, 2, 3] },
    { question: "Most of my free time is spent:", options: ["watching television", "talking to friends", "doing physical activity or making things"], ids: [1, 2, 3] },
    { question: "When I first contact a new person, I usually:", options: ["arrange a face to face meeting", "talk to them on the telephone", "try to get together whilst doing something else, such as an activity or a meal"], ids: [1, 2, 3] },
    { question: "I first notice how people:", options: ["look and dress", "sound and speak", "stand and move"], ids: [1, 2, 3] },
    { question: "If I am angry, I tend to:", options: ["keep replaying in my mind what it is that has upset me", "raise my voice and tell people how I feel", "stamp about, slam doors and physically demonstrate my anger"], ids: [1, 2, 3] },
    { question: "I find it easiest to remember:", options: ["faces", "names", "things I have done"], ids: [1, 2, 3] },
    { question: "I think that you can tell if someone is lying if:", options: ["they avoid looking at you", "their voices changes", "they give me funny vibes"], ids: [1, 2, 3] },
    { question: "When I meet an old friend:", options: ["I say 'it’s great to see you!'", "I say 'it’s great to hear from you!'", "I give them a hug or a handshake"], ids: [1, 2, 3] },
    { question: "I remember things best by:", options: ["writing notes or keeping printed details", "saying them aloud or repeating words and key points in my head", "doing and practising the activity or imagining it being done"], ids: [1, 2, 3] },
    { question: "If I have to complain about faulty goods, I am most comfortable:", options: ["writing a letter", "complaining over the phone", "taking the item back to the store or posting it to head office"], ids: [1, 2, 3] },
    { question: "I tend to say:", options: ["I see what you mean", "I hear what you are saying", "I know how you feel"], ids: [1, 2, 3] }
];

let answers = [];
let userName = '';

document.getElementById('startTest').addEventListener('click', () => {
    userName = document.getElementById('inputName').value;
    document.getElementById('intro').style.display = 'none';
    document.getElementById('questionnaire').style.display = 'block';
    createCarouselItems();
});

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

    // Add logo
    const logo = new Image();
    logo.src = 'assets/imgs/logo.png';
    const logoHeight = 30; // Ajuste conforme necessário
    const logoWidth = (logoHeight / logo.height) * logo.width;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logo, 'PNG', logoX, 10, logoWidth, logoHeight);

    // Add user name
    doc.setFontSize(14);
    doc.text(`Name: ${userName}`, 10, 50);


    // Add title at the top of the first page
    const title = document.querySelector('#resultText h2').textContent;
    doc.setFontSize(16);
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 60, { align: 'center' });

    // Add result content to the first page
    const content = document.querySelector('#resultText p').textContent;
    const splitText = doc.splitTextToSize(content, 250);
    doc.setFontSize(12);
    doc.text(splitText, 10, 70);

    // Add questions and answers to the following pages
    let yPos = 100; // Vertical position
    let currentPage = 1; // Current page number

    questions.forEach((q, index) => {
        const selectedAnswer = answers[index];
        const questionText = `${index + 1}. ${q.question}`;
        const options = q.options.map((option, idx) => {
            if (q.ids[idx] === selectedAnswer) {
                return `• ${capitalizeFirstLetter(option)}`; // Highlight the selected answer
            } else {
                return `  ${capitalizeFirstLetter(option)}`;
            }
        });

        const questionWithAnswer = [questionText, ...options].join('\n');
        const textLines = doc.splitTextToSize(questionWithAnswer, 250);

        // Check if there is enough space for the question and answer
        const lineHeight = doc.getTextDimensions('M').h; // Height of a line of text
        const linesPerPage = Math.floor((doc.internal.pageSize.getHeight() - yPos) / lineHeight);

        if (linesPerPage < textLines.length + 2) { 
            doc.addPage(); // Add a new page
            currentPage++;

            // Adjust the vertical position for the new page
            yPos = currentPage > 1 ? 20 : 10; 
        }

        doc.setFont('helvetica', 'normal');
        doc.text(questionWithAnswer, 10, yPos);
        yPos += (textLines.length + 1) * lineHeight + 10; // Space between questions
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

document.addEventListener('DOMContentLoaded', function() {
    const inputName = document.getElementById('inputName');
    const startTestBtn = document.getElementById('startTest');

    inputName.addEventListener('input', function() {
        if (inputName.value.trim() !== '') {
            startTestBtn.disabled = false;
        } else {
            startTestBtn.disabled = true;
        }
    });

    startTestBtn.addEventListener('click', function() {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
        createCarouselItems();
    });
});
