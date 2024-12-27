import data from "./data.json" with { type: "json" };

const paginationIndex = 5;
const noOfPages = parseInt(data.length / paginationIndex + 1);

const createSearchResultCard = () => {
  const searchResultWrapperEl = document.getElementById("search_results");
  let currentIndex = document.querySelector('.active').innerHTML;
  let start = (currentIndex - 1)*paginationIndex;
  let end = currentIndex * paginationIndex;

  if(end > data.length) {
    end = data.length;
  }

  for(let i = start; i < end; i++) {
    let result = data[i];

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    const cardTitle = document.createElement("div");
    cardTitle.className = "cardTitle"
    const cardHeading = document.createElement("h4");
    cardHeading.className = "heading";
    const cardDate = document.createElement("p");
    const cardContent = document.createElement("div");
    cardContent.className = "cardContent"
    
    cardDiv.appendChild(cardTitle);

    let title = result.from.name;
    
    if(result.type === "Post") {
      title += " Posted";
    } else if(result.type == "Reply") {
      title += " Replied";
    }
    cardTitle.appendChild(cardHeading);
    cardHeading.textContent = title;
    cardTitle.appendChild(cardDate);
    cardDiv.appendChild(cardContent);

    const desc = document.createElement("p");
    desc.className = "cardDesc";
    desc.textContent = result.fullText;

    cardContent.appendChild(desc);

    searchResultWrapperEl.appendChild(cardDiv);
  }
}

const onChangeHandler = (e) => {
  const inputVal = document.getElementById("search");

  const descEl = document.querySelectorAll(".cardContent");

  descEl.forEach((desc) => {
    const cardDesc = desc.querySelector(".cardDesc");
    const textContent = cardDesc.textContent;
    cardDesc.remove();
    const textResult = textContent.toLowerCase().split(e.target.value.toLowerCase());

    console.log("text result: ", textContent);
    let messageNode = document.createElement("p");
    messageNode.classList.add('cardDesc');

    textResult.forEach((part, idx) => {
      let span = document.createElement('span');
      let textNode = document.createTextNode(part);

      span.append(textNode);
      messageNode.append(span);

      if(idx < textResult.length - 1) {
        let highlightedSpan = document.createElement('span');

        let highlightedTextNode = document.createTextNode(e.target.value);
        highlightedSpan.classList.add('highlight');
        highlightedSpan.append(highlightedTextNode);
        messageNode.append(highlightedSpan);
      }
    })
    desc.append(messageNode);
  })
  
}

const createPagination = () => {
  const paginationContainer = document.querySelector("#pagination");
  console.log(paginationContainer)
  for(let i = 1; i <= noOfPages; i++) {
    let button = document.createElement('button');
    button.classList.add('pagination-btn');
    if(i == 1) {
      button.classList.add('active');
    }
    button.id = i;
    let btnText = document.createTextNode(i);
    button.append(btnText);
    paginationContainer.append(button);
  }

  const searchResultWrapperEl = document.getElementById("search_results");
  const paginatedBtn = Array.from(document.querySelectorAll('.pagination-btn'));
  console.log(paginatedBtn);
  paginatedBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      let currentActiveBtn = document.querySelector('.active');
      console.log("btn", currentActiveBtn)
      let clickedBtn = document.getElementById(evt.target.id);
      currentActiveBtn.classList.remove('active');
      clickedBtn.classList.add('active');

      createSearchResultCard(searchResultWrapperEl);
    })
  })
}

const searchEl = document.getElementById("search");

searchEl.addEventListener('keyup', onChangeHandler);
createPagination();
createSearchResultCard();
