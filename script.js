const chatInput = document.querySelector("#Chat_Input");
const sendBtn = document.querySelector("#sendButton");
const chatContainer = document.querySelector("#chat_container");

let userText = null
const API_KEY = "";

const createElement = (html, className) => {
    // Create new div and apply caht specified calss and set html content to div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat")
    chatDiv.innerHTML = html;
    return chatDiv;
    // Retruning the chatDiv
}

const getChatResponse = async() => {
    const API_URL = "https://api.openai.com/v1/completions"; 

    // Setting up the properties of API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temprature: 0.2,
            n: 1,
            stop: null
        })
    }

    try{
        const response = await(await fetch(API_URL, requestOptions)).JSON();
        console.log(response);
    } catch(error){
        console.log(error);
    }
}

const showTypingAnimation = () => {
    const html = `<div class="chat_content">
                     <div class="chat_details">
                        <img src="Files/ChatGPT.png" alt="User Profile Image">
                        <!-- Creating Typing animation -->
                        <div class="typingAnimation">
                            <div class="Dot" style="--delay: 0.2s"></div>
                            <div class="Dot" style="--delay: 0.3s"></div>
                            <div class="Dot" style="--delay: 0.4s"></div>
                        </div> 
                    </div>
                    <span class="material-symbols-rounded">content_copy</span>
                </div>`;

    // create an in chat div with typing animation and append it to the chat container
    const outChatDiv = createElement(html, 'in');
    chatContainer.appendChild(outChatDiv)

    getChatResponse();
}

const handleOutchat = (e) => {
    userText = chatInput.value.trim();  // Gets the chat input and removes extra spaces
    console.log(userText);

    const html = `<div class="chat_content">
                    <div class="chat_details">
                        <img src="Files/user.png" alt="User Profile Image">
                        <p>${userText}</p>
                    </div>
                </div>`;

    // create an out chat div with users message and append it to the chat container
    const outChatDiv = createElement(html, 'out');
    chatContainer.appendChild(outChatDiv)

    setTimeout(showTypingAnimation, 500);
}

sendBtn.addEventListener("click", handleOutchat);


