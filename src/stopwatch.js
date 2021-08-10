class Stopwatch {
    timerInterval;
    timer = 0;
    laps = [];
    constructor(params) {
        this.stopwatchTimer = params.stopwatchTimer;
        this.toggleStopwatchButton = params.toggleStopwatchButton;
        this.restartButton = params.restartButton;
        this.pauseButton = params.pauseButton;
        this.lapButton = params.lapButton || null;
        this.clearLapsButton = params.clearLapsButton || null;
        this.lapsList = params.lapsList || null;
        this.zeroLaps = params.zeroLaps || null;

        this.#addEvents();
    }
    #addEvents() {
        this.toggleStopwatchButton.addEventListener('click', () => {
            if (this.toggleStopwatchButton.classList.contains('btn-start')) {
                this.start();
                this.restartButton.removeAttribute('hidden');
                if (this.lapButton)
                    this.lapButton.removeAttribute('hidden');
                if (this.clearLapsButton)
                    this.clearLapsButton.removeAttribute('hidden');
            } else {
                this.stop();
            }
        });

        this.restartButton.addEventListener('click', () => this.restart());
        if (this.lapButton)
            this.lapButton.addEventListener('click', () => this.lap());
        if (this.clearLapsButton)
            this.clearLapsButton.addEventListener('click', () => this.clearLaps());
    }
    updateTimer() {
        this.stopwatchTimer.innerText = new Date(this.timer * 1000).toISOString().substr(11, 8)
    }
    start() {
        this.timerInterval = setInterval(() => {
            ++this.timer;
            this.updateTimer();
        }, 1000);
        this.toggleStopwatchButton.classList.remove('btn-start');
        this.toggleStopwatchButton.classList.add('btn-stop');
        this.toggleStopwatchButton.innerText = 'Stop';
    }
    stop() {
        clearInterval(this.timerInterval);
        this.toggleStopwatchButton.classList.remove('btn-stop');
        this.toggleStopwatchButton.classList.add('btn-start');
        this.toggleStopwatchButton.innerText = 'Start';
    }
    restart() {
        this.stop();
        this.timer = 0;
        this.updateTimer();
        this.start();
    }
    lap() {
        let lap = this.stopwatchTimer.innerText;
        let el = document.createElement('div');
        el.innerText = lap;
        this.zeroLaps.style.display = 'none';
        this.laps = [...this.laps, lap];
        this.lapsList.appendChild(el);
    }
    clearLaps() {
        this.laps = [];
        this.lapsList.innerHTML = null;
        this.zeroLaps.style.display = 'block';
    }
}