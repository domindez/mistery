export default function CreateShareIconsIsla(){
  
    const fragmentGame = document.createDocumentFragment();
  
    let pageUrl = encodeURI(document.location.href);
    let pageTittle = encodeURI(`¡He resuelto el misterio de Isla Premier y he ganado la botella!`);
    let pageTittleAlt = `¡He resuelto el miesterio de Isla Premier y he ganado la botella!`;
    
    const shareBtons = document.getElementById("share-button-container");
    shareBtons.setAttribute("class", "share-button-container");
  
    const twIcon = document.createElement("i");
    const telIcon = document.createElement("i");
    const waIcon = document.createElement("i");
    const shareIcon = document.createElement("i");
  
    twIcon.setAttribute("class", "fab fa-twitter");
    telIcon.setAttribute("class", "fab fa-telegram");
    waIcon.setAttribute("class", "fab fa-whatsapp");
    shareIcon.setAttribute("class", "fa-solid fa-share");
  
    const twLink = document.createElement("a");
    const telLink = document.createElement("a");
    const waLink = document.createElement("a");
    const shLink = document.createElement("a");
  
    twLink.setAttribute("href", `https://twitter.com/share?text=${pageTittle}&url=${pageUrl}`);
    telLink.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${pageUrl}`);
    waLink.setAttribute("href", `https://api.whatsapp.com/send?text=${pageTittle} ${pageUrl}`);
    telLink.setAttribute("href", `https://telegram.me/share/url?url=${pageUrl}&text=${pageTittle}`);
  
    shLink.addEventListener("click", share)
  
    function share(){
      navigator.share({
        title: 'El misterio de Isla Premier',
        text: pageTittleAlt,
        url: pageUrl,
      })
  
    }
  
    twLink.appendChild(twIcon);
    telLink.appendChild(telIcon);
    waLink.appendChild(waIcon);
    shLink.appendChild(shareIcon);
  
    fragmentGame.appendChild(twLink);
    fragmentGame.appendChild(telLink);
    fragmentGame.appendChild(waLink);
    fragmentGame.appendChild(shLink);
  
    shareBtons.appendChild(fragmentGame);
  }


