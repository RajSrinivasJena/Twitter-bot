const config = require('./config');
const Twit = require('twit');

const T = new Twit(config);

// Set up your search parameters
const params = {
  q: '#machinelearning',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response){

  let tweets = data.statuses
  if (!err)
  {
      let tweetIDList = []
      for(let tweet of tweets) {
          tweetIDList.push(tweet.id_str);

          //
      }


      for (let tweetID of tweetIDList) {
        T.post('statuses/retweet/:id', {id : tweetID}, function(err_rt, data_rt, response_rt){
            if(!err_rt){
                console.log("\n\nRetweeted! ID - " + tweetID)
            }
            else {
                console.log("\nError... Duplication maybe... " + tweetID)
                console.log("Error = " + err_rt)
            }
        })
    }
}
else {
    console.log("Error while searching" + err)
    process.exit(1)
}
})


// Run every 60 seconds
//setInterval(function() { retweet('#DataScience OR #DataVisualization'); }, 60000)
