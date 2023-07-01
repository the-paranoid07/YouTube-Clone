const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyBc14BGZ-Ezo0zANBwEZ1mXXGtNaEEdp28";

async function getYoutubeData(q){
    const url=`${BASE_URL}/search?key=${API_KEY}&part=snippet&q=js&type=video&maxResults=20
    `;
    const response = await fetch(url,{method : "get"});
    const data = await response.json();
    // console.log(data.items);
    getVideos(data.items);
}

getYoutubeData("");

async function getVideos(data){
    let videosData=[];
    for(let i =0; i< data.length ; i++){
        let videoId = data[i].id.videoId;
            let video = await getVideoDetails(videoId);
            //console.log(video)
            videosData.push(video);
    }
    //console.log(videosData)
   renderDataOntoUi(videosData);
}

async function getVideoDetails(videoId){
    const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}
    `;
    const fetchDetails = await fetch(url);
    const videoDetails = await fetchDetails.json();
    //console.log(videoDetails.items[0]);

    return videoDetails.items[0];
}


function renderDataOntoUi(videos){
    console.log(videos)
    const videoContainer = document.getElementById("video-container");
        videoContainer.innerHTML= "";
        
        videos.forEach(video => {
            let videoThumbnail = video.snippet.thumbnails.medium.url;
            let channelName = video.snippet.channelTitle ;
            let videoTitle = video.snippet.localized.title;
            let views = video.statistics.viewCount/1000;
            


            videoContainer.innerHTML += ` <div  class="video-card"  onclick="playVideo('${video.id}')">
            <div class="video-image">
                <img src="${videoThumbnail}" alt="thumbnail">
                <p class="duration">23:45</p>
            </div>
            <div class="video-details">
                <div class="channel-logo">
                   <img src="./User-Avatar.png" alt="channel-logo">
                </div>
                <div class="video-description">
                    <div class="video-title">${videoTitle}</div>
                    <div class="channel-name">${channelName}</div>
                    <div class="views">
                        <span class="view-count">${views}K Views</span>
                        <span class="uploaded-time">.1 week ago</span>
                    </div>
                </div>
            </div>
        </div>` 
        })
}

function playVideo(videoId){
    localStorage.setItem("videoId",videoId);
    window.open("./videoDetails.html")
}






