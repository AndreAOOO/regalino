const revealButton = document.querySelector('#reveal-button');
const giftCard = document.querySelector('#gift-card');
const stepLabel = document.querySelector('#step-label');
const stepCount = document.querySelector('#step-count');
const stepMessage = document.querySelector('#step-message');
const buttonLabel = document.querySelector('#button-label');
const progressBar = document.querySelector('#progress-bar');
const runner = document.querySelector('#runner');

const steps = [
  ['Un pensiero per te', 'Ogni bella sorpresa comincia con un piccolo gesto.'],
  ['Respira', 'Lascia fuori il rumore del mondo, anche solo per un momento.'],
  ['Sorridi', 'Questo passaggio e\' dedicato a quel sorriso che illumina tutto.'],
  ['Rallenta', 'Non c\'e\' fretta quando si tratta di prendersi cura di te.'],
  ['Ricorda', 'Hai fatto tanta strada. E io sono davvero fiero di te.'],
  ['Lasciati viziare', 'Per una volta non devi occuparti di niente.'],
  ['Quasi ci siamo', 'La sorpresa e\' sempre piu\' vicina.'],
  ['Ancora un po\'', 'Tieni questo momento tutto per te.'],
  ['Ultimo respiro', 'Chiudi gli occhi, esprimi un desiderio e continua.'],
  ['Sorpresa sbloccata', 'Questo regalo e\' un piccolo promemoria: meriti dolcezza.']
];

let currentStep = 0;

revealButton.addEventListener('click', () => {
  if (currentStep === steps.length) {
    giftCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  currentStep += 1;
  const [label, message] = steps[currentStep - 1];
  const isComplete = currentStep === steps.length;

  stepLabel.textContent = label;
  stepCount.textContent = `${currentStep} / ${steps.length}`;
  stepMessage.textContent = message;
  progressBar.style.width = `${currentStep * 10}%`;
  document.body.dataset.step = currentStep;
  runner.classList.remove('is-moving');
  void runner.offsetWidth;
  runner.classList.add('is-moving');

  if (isComplete) {
    giftCard.classList.add('is-visible');
    revealButton.setAttribute('aria-expanded', 'true');
    buttonLabel.textContent = 'Rivedi la sorpresa';
    revealButton.classList.add('is-complete');
    giftCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  buttonLabel.textContent = currentStep === 9 ? 'Apri il regalo' : 'Continua';
  revealButton.animate(
    [{ transform: 'translateY(0)' }, { transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }],
    { duration: 280, easing: 'ease-out' }
  );
});
