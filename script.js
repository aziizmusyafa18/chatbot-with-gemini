document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt-input');
    const sendButton = document.getElementById('send-button');
    const chatHistory = document.getElementById('chat-history');

    const sendMessage = () => {
        const prompt = promptInput.value.trim();
        if (prompt === '') return;

        appendMessage(prompt, 'user');
        promptInput.value = '';

        // Show a temporary "typing" indicator
        appendMessage('...', 'bot');

        // --- SIMULASI PANGGILAN API GEMINI ---
        // Di aplikasi nyata, Anda akan memanggil backend Anda dari sini,
        // yang kemudian akan memanggil API Gemini dengan aman.
        getGeminiResponse(prompt).then(response => {
            // Remove the "typing" indicator
            const typingIndicator = chatHistory.lastChild;
            chatHistory.removeChild(typingIndicator);
            
            appendMessage(response, 'bot');
        });
    };

    const appendMessage = (text, sender) => {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = `message ${sender}-message`;
        
        const messageBubble = document.createElement('p');
        messageBubble.textContent = text;
        
        messageWrapper.appendChild(messageBubble);
        chatHistory.appendChild(messageWrapper);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
    };

    /**
     * Fungsi ini mensimulasikan respons dari Gemini.
     * Ganti fungsi ini dengan logika panggilan API sesungguhnya ke backend Anda.
     * @param {string} prompt - The user's input.
     * @returns {Promise<string>} A simulated response from the bot.
     */
    const getGeminiResponse = (prompt) => {
        console.log(`Sending to mock API: "${prompt}"`);

        return new Promise(resolve => {
            setTimeout(() => {
                let response;
                if (prompt.toLowerCase().includes('halo') || prompt.toLowerCase().includes('hai')) {
                    response = 'Halo juga! Ada yang bisa saya bantu?';
                } else if (prompt.toLowerCase().includes('siapa kamu')) {
                    response = 'Saya adalah model bahasa AI, dilatih oleh Google.';
                } else {
                    response = "Ini adalah respons simulasi. Untuk mendapatkan respons nyata, Anda perlu menghubungkan ini ke API Gemini melalui server backend.";
                }
                resolve(response);
            }, 1500); // Simulate network delay
        });
    };

    sendButton.addEventListener('click', sendMessage);
    promptInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
