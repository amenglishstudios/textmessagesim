// script.js

// ‑‑ global elements
const conversationEl = document.getElementById('conversation');
const messageInput = document.getElementById('messageInput');
const speakerSelect = document.getElementById('speaker');
const sendBtn = document.getElementById('sendBtn');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const exportImageBtn = document.getElementById('exportImageBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');

// Utility: current timestamp string (HH:MM AM/PM)
function currentTimestamp() {
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit' };
  return now.toLocaleTimeString([], options);
}

// Add a message to conversation
function addMessage(speaker, text, timestamp = null) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', speaker === 'a' ? 'person-a' : 'person-b');

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;
  bubble.setAttribute('contenteditable', 'true');
  bubble.addEventListener('blur', saveToLocalStorage);

  const timeEl = document.createElement('div');
  timeEl.classList.add('timestamp');
  timeEl.textContent = timestamp || currentTimestamp();

  if (speaker === 'a') {
    messageDiv.appendChild(bubble);
    messageDiv.appendChild(timeEl);
  } else {
    messageDiv.appendChild(timeEl);
    messageDiv.appendChild(bubble);
  }

  conversationEl.appendChild(messageDiv);
  conversationEl.scrollTop = conversationEl.scrollHeight;
}

// Send button processing
sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (!text) return;
  const speaker = speakerSelect.value;
  addMessage(speaker, text);
  messageInput.value = '';
  saveToLocalStorage();
});

// Save to localStorage
function saveToLocalStorage() {
  const messages = [];
  conversationEl.querySelectorAll('.message').forEach(msgEl => {
    const speaker = msgEl.classList.contains('person-a') ? 'a' : 'b';
    const bubble = msgEl.querySelector('.bubble');
    const timestamp = msgEl.querySelector('.timestamp').textContent;
    messages.push({
      speaker,
      text: bubble.textContent,
      timestamp
    });
  });
  localStorage.setItem('imessageSimulatorData', JSON.stringify(messages));
  console.log('Conversation saved');
}

// Load from localStorage
loadBtn.addEventListener('click', () => {
  const data = localStorage.getItem('imessageSimulatorData');
  if (!data) {
    alert('No saved conversation found');
    return;
  }
  const messages = JSON.parse(data);
  conversationEl.innerHTML = '';
  messages.forEach(msg => {
    addMessage(msg.speaker, msg.text, msg.timestamp);
  });
  console.log('Conversation loaded');
});

// Export as image (PNG)
exportImageBtn.addEventListener('click', () => {
  html2canvas(conversationEl, { backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'conversation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    console.error('Export image failed:', err);
    alert('Image export failed');
  });
});

// Export as PDF
exportPdfBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  html2canvas(conversationEl, { backgroundColor: '#ffffff' }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    // If imgHeight > pageHeight you may add pages ...
    pdf.save('conversation.pdf');
  }).catch(err => {
    console.error('Export pdf failed:', err);
    alert('PDF export failed');
  });
});
