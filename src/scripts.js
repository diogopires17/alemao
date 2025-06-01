let current = 0;
const sections = document.querySelectorAll('.section');

function updateButtons() {
  document.getElementById("prevBtn").disabled = current === 0;
  document.getElementById("nextBtn").disabled = current === sections.length - 1;
}

function changeSection(direction) {
  sections[current].classList.remove('active');
  current += direction;
  sections[current].classList.add('active');
  updateButtons();
}
const particleCount = 40;
const container = document.getElementById('particles');
const animations = ['floatUpDown', 'floatLeftRight', 'floatDiag'];

for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');

  // Posiciona aleatoriamente na viewport
  p.style.top = Math.random() * 100 + 'vh';
  p.style.left = Math.random() * 100 + 'vw';

  // Tamanhos variados entre 4px e 10px
  const size = 4 + Math.random() * 6;
  p.style.width = size + 'px';
  p.style.height = size + 'px';

  // Animações variadas, com duração e atraso
  const anim = animations[Math.floor(Math.random() * animations.length)];
  const duration = 4 + Math.random() * 4;
  const delay = Math.random() * 4;
  p.style.animation = `${anim} ${duration}s ease-in-out infinite`;
  p.style.animationDelay = delay + 's';

  container.appendChild(p);
}



document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Respostas corretas — arrays com as opções certas para cada pergunta
  const correctAnswers = {
    q1: ['Malmö'],
    q2: ['2'],
    q3: ['Jogging'],
    q4: ['Lesen', 'Schwimmen'] // aceitamos mais do que uma aqui
  };

  const form = e.target;
  const resultDiv = document.getElementById('quizResult');
  let score = 0;
  const totalQuestions = Object.keys(correctAnswers).length;

  // Função para pegar os valores checked de um nome (checkboxes)
  function getCheckedValues(name) {
    return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
  }

  // Verificar cada pergunta
  for (const q in correctAnswers) {
    const userAnswers = getCheckedValues(q);
    const correct = correctAnswers[q];

    // Verifica se o user escolheu exatamente as respostas certas (mesmo conjunto)
    const isCorrect = userAnswers.length === correct.length &&
                      userAnswers.every(ans => correct.includes(ans));
    if (isCorrect) score++;
  }

  resultDiv.textContent = `Acertaste ${score} de ${totalQuestions} perguntas!`;
});


