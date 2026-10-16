const $ = id => document.getElementById(id);
let questions = [], position = 0, correctCount = 0, answered = false;
function decodeHTML(value) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
async function startQuiz() {
  $('start').disabled = true;
  $('status').textContent = 'Loading questions…';
  $('quiz').hidden = true;
  $('results').hidden = true;
  try {
    const category = $('category').value;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`, {cache:'no-store'});
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    if (data.response_code !== 0 || !Array.isArray(data.results) || data.results.length === 0) throw new Error('No questions available');
    questions = data.results.map(q => ({
      question: decodeHTML(q.question),
      correct: decodeHTML(q.correct_answer),
      options: shuffle([...q.incorrect_answers, q.correct_answer].map(decodeHTML))
    }));
    position = 0; correctCount = 0;
    $('status').textContent = 'Quiz ready!';
    showQuestion();
  } catch (error) {
    $('status').textContent = 'Could not load questions. Check your connection and try again in a few seconds.';
  } finally { $('start').disabled = false; }
}
function showQuestion() {
  answered = false;
  const q = questions[position];
  $('quiz').hidden = false;
  $('results').hidden = true;
  $('progress').textContent = `Question ${position + 1} of ${questions.length} · Score: ${correctCount}`;
  $('question').textContent = q.question;
  $('feedback').textContent = '';
  $('next').style.display = 'none';
  $('answers').replaceChildren();
  q.options.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => chooseAnswer(option));
    $('answers').append(button);
  });
}
function chooseAnswer(selected) {
  if (answered) return;
  answered = true;
  const q = questions[position];
  if (selected === q.correct) correctCount++;
  for (const button of $('answers').children) {
    button.disabled = true;
    if (button.textContent === q.correct) button.classList.add('correct');
    else if (button.textContent === selected) button.classList.add('wrong');
  }
  $('feedback').textContent = selected === q.correct ? 'Correct! 🎉' : `Not quite. Correct answer: ${q.correct}`;
  $('next').textContent = position === questions.length - 1 ? 'See results' : 'Next question';
  $('next').style.display = 'inline-block';
}
$('start').addEventListener('click', startQuiz);
$('again').addEventListener('click', startQuiz);
$('next').addEventListener('click', () => {
  position++;
  if (position < questions.length) showQuestion();
  else {
    $('quiz').hidden = true;
    $('results').hidden = false;
    $('score').textContent = `You got ${correctCount} out of ${questions.length} correct!`;
    $('status').textContent = 'Finished!';
  }
});
