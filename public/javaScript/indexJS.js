/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

let slideIndex = 1;
showSlides(slideIndex);

// Left and Right Slides Control
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

document.getElementById('send-button').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return;

  addMessageToChat('User', userInput);

  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    if (data.reply) {
      addMessageToChat('Chatbot', data.reply);
    } else {
      addMessageToChat('Chatbot', 'Sorry, something went wrong.');
    }
  } catch (error) {
    console.error('Error:', error);
    addMessageToChat('Chatbot', 'Chatbot is unavailable at the moment.');
  }

  document.getElementById('user-input').value = '';
});

function addMessageToChat(sender, message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


