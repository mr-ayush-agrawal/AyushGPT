const chatInput = document.querySelector("#Chat_Input");
const sendBtn = document.querySelector("#sendButton");
const chatContainer = document.querySelector(".chat_container");

let userText = null
const API_KEY = "";

const loadDataFromLocalStorage = () => {
    chatContainer.innerHTML =  localStorage.getItem("all-chats");
}

loadDataFromLocalStorage();

const createElement = (html, className) => {
    // Create new div and apply caht specified calss and set html content to div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat",className);
    chatDiv.innerHTML = html;
    return chatDiv;
    // Retruning the chatDiv
}

const getChatResponse = async(inChatDiv) => {
    const API_URL = "https://api.openai.com/v1/chat/completions"; 
    const pElement = document.createElement("p");

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

    // send post request to API, get response and set the response as paragraph element text
    try{
        const response = await(await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
        // console.log(response);
    } catch(error){
        console.log(error);
    }


    // Removing the typing animation, append the paragraph and save it to local storage
    inChatDiv.querySelector(".typingAnimation").remove();
    inChatDiv.querySelector(".chat_details").appendChild(pElement);

    // Saving the responses in local system
    localStorage.setItem("all-chats",chatContainer.innerHTML);

}

const copyResonse = (copyBtn) => {
    // Copy the text content of the response to the clipboard  
    const responseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
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
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;

    // create an in chat div with typing animation and append it to the chat container
    const inChatDiv = createElement(html, 'in');
    chatContainer.appendChild(inChatDiv)

    getChatResponse(inChatDiv);
}

const handleOutchat = () => {
    userText = chatInput.value.trim();  // Gets the chat input and removes extra spaces
    // console.log(userText);

    // If Input is empty return here
    if(!userText)
        return; 

    const html = `<div class="chat_content">
                    <div class="chat_details">
                        <img src="Files/user.png" alt="User Profile Image">
                        <p></p>
                    </div>
                </div>`;

    // create an out chat div with users message and append it to the chat container
    const outChatDiv = createElement(html,"out");
    outChatDiv.querySelector("p").textContent = userText; 
    chatContainer.appendChild(outChatDiv);

    setTimeout(showTypingAnimation, 500);
}

sendBtn.addEventListener("click", handleOutchat);


