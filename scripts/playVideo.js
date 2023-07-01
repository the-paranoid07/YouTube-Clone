const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyBc14BGZ-Ezo0zANBwEZ1mXXGtNaEEdp28";

const video = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");

video.src = `https://www.youtube.com/embed/${videoId}`;

async function getVideoDetails(videoId) {
  const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}
    `;
  const fetchDetails = await fetch(url);
  const videoDetails = await fetchDetails.json();
  console.log(videoDetails.items[0]);
  renderVideoDetails(videoDetails.items[0]);
}

getVideoDetails(videoId);

function renderVideoDetails(videoDetails) {
  const titleContainer = document.getElementById("title-container");

  const channelContainer = document.getElementById("channel-container");

  //console.log(videoDetails.snippet.localized.title);

  let description = videoDetails.snippet
  .description.slice(0,290);

  titleContainer.innerHTML += `<div class="title">
        ${videoDetails.snippet.localized.title}
    </div>
    <div class="details">
        <div class="left">
            <span class="views">${videoDetails.statistics.viewCount} views</span>
            <span class="uploaded-time">Oct 21,2020</span>
        </div>
        <div class="right">
            <div class="items">
                <img src="./assets/icons/like.png" alt="like">
                <p>${videoDetails.statistics.likeCount}</p>
            </div>
            <div class="items">
                <img src="./assets/icons/dislike.png" alt="dislike">
            </div>
            <div class="items">
                <img src="./assets/icons/share.png" alt="share">
                <p>Share</p>
            </div>
            <div class="items">
                <img src="./assets/icons/save.png" alt="save">
                <p>Save</p>
            </div>
            <div class="items">
                <img src="./assets/icons/3-dot.png" alt="3-dot">
            </div>
        </div>
    </div>`;

  channelContainer.innerHTML += `<div class="title">
    <div class="left">
        <div class="logo">
            <img src="./User-Avatar.png" alt="">
        </div>
        <div class="details">
            <span class="name">${videoDetails.snippet.channelTitle}</span>
            <span class="subsciber-count">72163 subscribers</span>
        </div>
    </div>
    <div class="right">
        <button>SUBSCRIBE</button>
    </div>
</div>
<div class="description">
    <span>${description}</span>
    <span class="show-more">SHOW MORE</span>
</div>`;

const commentCount = document.getElementsByClassName("comment-count")[0];

commentCount.innerText = videoDetails.statistics.commentCount+ " Comments";
}

async function fetchCommentsObjects(videoId) {
  const url = `${BASE_URL}/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${API_KEY}`;

  const response = await fetch(url);
  const comments = await response.json();
  getCommentsData(comments.items);
  // console.log(comments.items);
}
fetchCommentsObjects(videoId);

function getCommentsData(commentObjects) {
  let commentData = [];

  for (let i = 0; i < commentObjects.length; i++) {
    commentData.push(commentObjects[i].snippet.topLevelComment.snippet);
  }
  //console.log(commentData);
  renderCommentsOntoUI(commentData);
}

function renderCommentsOntoUI(comments) {
  const commentsContainer = document.getElementById("comments-container");

  comments.forEach((comment) => {
    let commentDisplay = comment.textDisplay.slice(0,50);
    commentsContainer.innerHTML += `
    <div class="comment">
                    <div class="upper">
                        <div class="logo">
                            <img src="${comment.authorProfileImageUrl}" alt="">
                        </div>
                        <div class="comment-info">
                            <div class="user">
                                <span class="username">${comment.authorDisplayName}</span>
                                <span class="uploaded-ago">8 hour ago</span>
                            </div>
                            <div class="comment-description">
                            ${commentDisplay}
                            </div>
                        </div>
                    </div>
                    <div class="lower">
                            <div class="like">
                                <img src="./assets/icons/like.png" alt="like">
                                <span>${comment.likeCount}</span>
                            </div>
                            <div class="dislike">
                                <img src="./assets/icons/dislike.png" alt="dislike">
                            </div>
                            <div class="reply">REPLY</div>
                    </div>
                    <div class="show-reply">Show replies</div>

                </div>
    `;
  });
}

//  async function showReplies(){
//    const url = `${BASE_URL}/comments?part=snippet&parentId=COMMENT_ID&key=${API_KEY}`

//  }
