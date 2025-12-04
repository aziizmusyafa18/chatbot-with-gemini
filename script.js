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

        // Panggil backend API yang terhubung ke Gemini
        getGeminiResponse(prompt).then(response => {
            // Remove the "typing" indicator
            const typingIndicator = chatHistory.lastChild;
            chatHistory.removeChild(typingIndicator);

            appendMessage(response, 'bot');
        }).catch(error => {
            // Remove the "typing" indicator
            const typingIndicator = chatHistory.lastChild;
            chatHistory.removeChild(typingIndicator);

            appendMessage('Terjadi kesalahan. Silakan coba lagi.', 'bot');
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
     * Fungsi untuk memanggil backend API yang terhubung ke Gemini.
     * @param {string} prompt - The user's input.
     * @returns {Promise<string>} Response from Gemini AI.
     */
    const getGeminiResponse = async (prompt) => {
        console.log(`Sending to Gemini API: "${prompt}"`);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: prompt })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return 'Maaf, terjadi kesalahan saat menghubungi AI. Pastikan server backend sudah berjalan.';
        }
    };

    sendButton.addEventListener('click', sendMessage);
    promptInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
