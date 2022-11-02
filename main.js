// main varibles
let theInput = document.querySelector(".get-repos input");
let getButton =  document.querySelector(".get-button");
let reposData =  document.querySelector(".show-data");

window.onload = function () {
    getButton.click();
}
    getButton.onclick = function () {
        
        getRepos();
    }

// get repos function 
function getRepos() {

    if (theInput.value == ""){ // if value is empty
        reposData.innerHTML = `<span> please write UserName.</span>` ;
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((data) => {
            // console.log('Success:', data)

            // Empty container
            reposData.innerHTML = ``;

            // loop on repositries
            data.forEach(repo => {

                //create main div and txt>repoName
                let mainDiv = document.createElement("div");
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);

                // create repo URl
                let theUrl = document.createElement("a");
                let theUrlText = document.createTextNode("visit");

                // theUrl.setAttribute("href",repo.owner.repos_url);
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                // set attribute blank
                theUrl.setAttribute("target","_blank");

                // create starts count span
                theUrl.appendChild(theUrlText);

                // Append Url Anchor To Main Div
                mainDiv.appendChild(theUrl);

                // create the stars count span
                let startsSpan = document.createElement("span");

                // create the stars count text
                let startsText = document.createTextNode(`stars ${repo.stargazers_count}`);

                // append Stars coun Text to stars span 
                startsSpan.appendChild(startsText);

                // append stars count span to main div
                mainDiv.appendChild(startsSpan);

                // add class to main div 
                mainDiv.className = 'repo-box';

                // append The main dic to container
                reposData.appendChild(mainDiv);
            });
        });
    };
};