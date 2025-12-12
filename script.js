// Mood Tracker logic
export function handleMoodForm() {
  const form = document.getElementById('moodForm');
  const list = document.getElementById('moodList');

  // Load saved moods from localStorage
  let savedMoods = JSON.parse(localStorage.getItem('moodEntries')) || [];

  function renderMoods() {
    list.innerHTML = ''; // Clear previous list
    savedMoods.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.date} - ${entry.mood}: ${entry.note}`;
      list.prepend(li); // Show newest first
    });
  }

  renderMoods(); // Display moods on load

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const mood = document.getElementById('moodSelect').value;
    const note = document.getElementById('moodNote').value;
    const date = new Date().toLocaleDateString();

    if (!mood) return alert('Please select a mood');

    const entry = { date, mood, note };
    savedMoods.unshift(entry); // Add to top
    localStorage.setItem('moodEntries', JSON.stringify(savedMoods));
    renderMoods(); // Update UI
    form.reset();
  });
}

// Clear mood entries
export function setupClearButton() {
  const btn = document.getElementById('clearMoods');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.removeItem('moodEntries');
      document.getElementById('moodList').innerHTML = '';
    });
  }
}

// Pomodoro Timer logic
export function setupPomodoro() {
  let timeLeft = 1500; // 25 mins
  let timer;

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  window.startTimer = function () {
    if (!timer) {
      timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
          clearInterval(timer);
          timer = null;
          alert("Time's up!");
        }
      }, 1000);
    }
  };
}