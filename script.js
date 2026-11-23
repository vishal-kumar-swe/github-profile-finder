const inputUsername = document.querySelector("#input-username");
const searchButton = document.querySelector(".search-button");
const profilePic = document.querySelector(".avatar");
const name = document.querySelector("#name");
const username = document.querySelector("#username");
const joinedDate = document.querySelector(".joined-date");
const bio = document.querySelector(".bio");
const repoCount = document.querySelector(".repo-count");
const followersCount = document.querySelector(".followers-count");
const followingCount = document.querySelector(".following-count");
const yearCount = document.querySelector(".year-count");
const topLang = document.querySelector(".top-lang");
const profileLink = document.querySelector(".link-display");

// const firstRepoName = document.querySelector(".first-repo-name");
// const firstRepoDescription = document.querySelector(".first-repo-description");
// const firstRepoLang = document.querySelector(".first-repo-lang");
// const firstRepoStar = document.querySelector(".first-repo-star");
// const firstRepofork = document.querySelector(".first-repo-fork");
// const secondRepoName = document.querySelector(".second-repo-name");
// const secondRepoDescription = document.querySelector(
//   ".second-repo-description",
// );
// const secondRepoLang = document.querySelector(".second-repo-lang");
// const secondRepoStar = document.querySelector(".second-repo-star");
// const secondRepofork = document.querySelector(".second-repo-fork");
// const thirdRepoName = document.querySelector(".third-repo-name");
// const thirdRepoDescription = document.querySelector(".third-repo-description");
// const thirdRepoLang = document.querySelector(".third-repo-lang");
// const thirdRepoStar = document.querySelector(".third-repo-star");
// const thirdRepofork = document.querySelector(".third-repo-fork");

const cardContainer = document.querySelector('.card-container');

const profileCard = document.querySelector('.profile-card')
const welcomeScreen = document.querySelector('.welcome-screen')
const loadingScreen = document.querySelector('.loading-screen')

profileCard.style.display = 'none';
welcomeScreen.style.display = 'flex';
loadingScreen.style.display = 'none';

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  profileCard.style.display = 'none';
  welcomeScreen.style.display = 'none';
  loadingScreen.style.display = 'flex';

  let repoUrl = null;

  fetch(`https://api.github.com/users/${inputUsername.value.trim()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
        // alert('Enter valid username')  // this will just give error message to user but not stop execution
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      loadingScreen.style.display = 'none';
      welcomeScreen.style.display = 'none';
      profileCard.style.display = 'flex';
      avatar(data.avatar_url);
      updateName(data.name);
      userName(data.login);
      joiningdate(data.created_at);
      addingBio(data.bio);
      reposCount(data.public_repos);
      followerCount(data.followers);
      followings(data.following);
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
          // console.log(repoData);
          addTopLang(repoData);
          topRepo(repoData);
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      // console.log(error)
      alert(error);
    });
  inputUsername.value = "";
});

function avatar(pic) {
  // to add profile picture
  profilePic.src = pic;
}

function updateName(names) {
  // to add name
  if (names === null) {
    name.innerText = "Not Available";
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
  const date = new Date(dates);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  joinedDate.innerHTML = `Joined ${formattedDate}`;
}

function addingBio(about) {
  if (about === null) {
    bio.innerHTML = "This profile has no bio";
  } else {
    bio.innerHTML = `${about}`;
  }
}

function reposCount(repo) {
  repoCount.innerText = `${repo}`;
}

function followerCount(followers) {
  followersCount.innerText = formatCount(`${followers}`);
}

function followings(following) {
  followingCount.innerText = formatCount(`${following}`);
}

function duration(dates) {
  // for account age
  const createdAt = new Date(dates);
  const today = new Date();

  let years = today.getFullYear() - createdAt.getFullYear();

  if (
    today.getMonth() < createdAt.getMonth() ||
    (today.getMonth() === createdAt.getMonth() &&
      today.getDate() < createdAt.getDate())
  ) {
    years--;
  }

  yearCount.innerText = `${years} years`;
}

function profileDuration(link) {
  profileLink.href = link;
}

function addTopLang(array) {
  // adding top language

  let langCount = {};

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

// function topRepos(array) {
//   const arr = sort(array);

//   if (arr.length >= 3) {
//     const newSlicedArr = arr.slice(0, 3);

//     firstRepoName.innerText = newSlicedArr[0].name;
//     firstRepoDescription.innerText = newSlicedArr[0].description;
//     firstRepoLang.innerText = newSlicedArr[0].language;
//     firstRepoStar.innerText = formatCount(newSlicedArr[0].stargazers_count);
//     firstRepofork.innerText = formatCount(newSlicedArr[0].forks_count);

//     secondRepoName.innerText = newSlicedArr[1].name;
//     secondRepoDescription.innerText = newSlicedArr[1].description;
//     secondRepoLang.innerText = newSlicedArr[1].language;
//     secondRepoStar.innerText = formatCount(newSlicedArr[1].stargazers_count);
//     secondRepofork.innerText = formatCount(newSlicedArr[1].forks_count);

//     thirdRepoName.innerText = newSlicedArr[2].name;
//     thirdRepoDescription.innerText = newSlicedArr[2].description;
//     thirdRepoLang.innerText = newSlicedArr[2].language;
//     thirdRepoStar.innerText = formatCount(newSlicedArr[2].stargazers_count);
//     thirdRepofork.innerText = formatCount(newSlicedArr[2].forks_count);
//   }
// }

function  topRepo(array) {
    cardContainer.innerHTML = '';
    let arr = sort(array);
    
    if (arr.length > 3) {
        arr = arr.slice(0, 3);
    }
    if (arr.length === 0) {
        cardContainer.innerHTML = `
        <div class="empty-display-message">
        <i class="fa-regular fa-folder-open"></i>
        <span>No repositories found</span>
        <span class="line2">This user has no public repositories yet</span>
        </div>`;
    } else {
        for (let i = 0; i < arr.length; i++) {
            cardContainer.innerHTML += `
            <article class="repo-card">
              <div class="repo-name">
                <i class="fa-solid fa-book"></i>
                <h4 class="repo-title">${arr[i].name}</h4>
              </div>

              <p class="repo-description">${arr[i].description}</p>

              <div class="repo-stats">
                <span class="lang">
                  <i class="fa-solid fa-circle"></i>
                  <span class="repo-lang">${arr[i].language}</span>
                </span>

                <span class="star">
                  <i class="fa-regular fa-star"></i>
                  <span class="star-count">${formatCount(arr[i].stargazers_count)}</span>
                </span>

                <span class="fork">
                  <i class="fa-solid fa-code-fork"></i>
                  <span class="fork-count">${formatCount(arr[i].forks_count)}</span>
                </span>
              </div>
            </article>`;
        }
    }
}

function sort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 1; j < array.length - i; j++) {
      if (array[j].stargazers_count > array[j - 1].stargazers_count) {
        let temp = array[j];
        array[j] = array[j - 1];
        array[j - 1] = temp;
      }
    }
  }
  return array;
}

function formatCount(count) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}
