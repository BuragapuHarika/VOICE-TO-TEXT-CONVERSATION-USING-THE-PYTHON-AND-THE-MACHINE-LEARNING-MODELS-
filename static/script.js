function appendMessage(message, from) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add(from);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

function sendCommand() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
        appendMessage(`User: ${userInput}`, 'user');
        fetch('/process_command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: userInput })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage(`Lumos: ${data.response}`, 'lumos');
        });
    }
}

function startListening() {
    if (annyang) {
        annyang.start(); // Start listening for speech commands
    }
}

if (annyang) {
    // Set up speech recognition commands
    annyang.addCommands({
        'open chrome': function() {
            appendMessage('User: open chrome', 'user');
            sendCommand('open chrome');
        },
        'tell me a joke': function() {
            appendMessage('User: tell me a joke', 'user');
            sendCommand('tell me a joke');
        },
        // Add more voice commands as needed
    });
}
