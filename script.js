const inputUsername = document.querySelector("#input-username");
const searchButton = document.querySelector(".search-button");
const profilePic = document.querySelector(".avatar")
const name = document.querySelector('#name')
const username = document.querySelector('#username')
const joinedDate = document.querySelector('.joined-date')
const bio = document.querySelector('.bio')
const repoCount = document.querySelector('.repo-count')
const followersCount = document.querySelector('.followers-count')
const followingCount = document.querySelector('.following-count')
const yearCount = document.querySelector('.year-count')
const topLang = document.querySelector('.top-lang')
const profileLink = document.querySelector('.link-display')

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    let repoUrl = null;

    fetch(`https://api.github.com/users/${inputUsername.value.trim()}`)
    .then((response) => {

        if(!response.ok) {
            throw new Error("User not found")
            // alert('Enter valid username')  // this will just give error message to user but not stop execution
        }
        return response.json()
    })
    .then((data) => {
        console.log(data);
        avatar(data.avatar_url);
        updateName(data.name);
        userName(data.login);
        joiningdate(data.created_at);
        addingBio(data.bio);
        reposCount(data.public_repos);
        followerCount(data.followers);
        followings(data.following)
        duration(data.created_at);
        profileDuration(data.html_url);

        fetch(data.repos_url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Unexpected Error");
            } else {
              return response.json();
            }
          })
          .then((repoData) => {
            console.log(repoData);
            addTopLang(repoData);
          })
          .catch((error) => {
            alert(error);
          });

    })
    .catch((error) => {
        // console.log(error)
        alert(error)
    })
    inputUsername.value = "";
})



function avatar(pic) {
  // to add profile picture
  profilePic.src = pic;
}

function updateName(names) {
    // to add name
    if (names === null) {
        name.innerText = 'Not Available';
    } else {
        name.innerText = `${names}`;
    }
}

function userName(usernames) {
    // to add username
    username.innerText = `@${usernames}`;
}


function joiningdate(dates) {
    // to add joining date
    const date = new Date(dates)
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

    joinedDate.innerHTML = `Joined ${formattedDate}`
}

function addingBio(about) {
    if (about === null) {
        bio.innerHTML = 'This profile has no bio'
    } else {
        bio.innerHTML = `${about}`;
    }
}

function reposCount(repo) {
    repoCount.innerText = `${repo}`;
}

function followerCount(followers) {
    followersCount.innerText = `${followers}`;
}

function followings(following) {
    followingCount.innerText = `${following}`;
}

function duration(dates) {
    // for account age
    const createdAt = new Date(dates)
    const today = new Date();

    let years = today.getFullYear() - createdAt.getFullYear();

    if (today.getMonth() < createdAt.getMonth() || (today.getMonth() === createdAt.getMonth() && today.getDate() < createdAt.getDate())) {
        years--;
    }

    yearCount.innerText = `${years} years`
}

function profileDuration(link) {
    profileLink.href = link;
}


function addTopLang (array) {
    // adding top language

    let langCount = {}

    for (let index = 0; index < array.length; index++) {
        let repoLang = array[index].language;
         
        if (repoLang !== null) {
            if (langCount[repoLang] === undefined) {
                langCount[repoLang] = 1;
            } else {
                langCount[repoLang] += 1;
            }
        }
    }

    let maxcount = 0;
    let mostUsedLang = "Not available";

    for (const key in langCount) {
        
        if (langCount[key] > maxcount) {
            maxcount = langCount[key];
            mostUsedLang = key;
        }
    }

    topLang.innerText = mostUsedLang;
}