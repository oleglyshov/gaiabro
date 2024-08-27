const axios = require("axios");
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const getCurrentMoscowTime = () => {
    const date = new Date();
    // Получаем время UTC+3
    const moscowTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    return moscowTime.toISOString().replace('T', ' ').substring(0, 19);
};


(async () => {
    try {
        console.log('Goyda Net By [Cryptohomo Industries]\n\n');

        const addressList = await fs.readFileSync('keyword.txt', 'utf-8');
        const addressListArray = await addressList.split('\n');
        
        let messageContent = addressListArray[11] || "Start"; 

        for (let index = 11; index < addressListArray.length; index++) {
            console.log("Content Chat: " + messageContent + "\n");

            try {
                const response = await axios.post(
                    'https://0xdd006045421e04767ecd4679ee8c2acd70d9f8bd.us.gaianet.network/v1/chat/completions',
                    {
                        'messages': [
                            {
                                'role': 'system',
                                'content': 'You are a helpful assistant.'
                            },
                            {
                                'role': 'user',
                                'content': messageContent
                            }
                        ]
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const botResponse = response.data.choices[0].message.content;
                console.log("Response: [" + botResponse + "]\n");
                
                console.log("Last message sent at (MSK, UTC+3): " + getCurrentMoscowTime() + "\n");

                messageContent = botResponse;

                console.log("Wait random time \n\n");

                const randomDelay = getRandomDelay(10000, 65000);
                await delay(randomDelay);

            } catch (postError) {
                console.error("Error during axios post: ", postError);
            }
        }
    } catch (error) {
        console.error("Error: ", error);
    }
})();
