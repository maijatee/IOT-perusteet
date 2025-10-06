const url = "https://api.thingspeak.com/channels/3090555/feeds.json?api_key=DN48R69056SGLA1L";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const feeds = data.feeds;

    const temperatures = feeds.map(feed => ({
      time: feed.created_at,
      temperature: parseFloat(feed.field1)
    }));

    document.getElementById("output").textContent = JSON.stringify(temperatures, null, 2);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById("output").textContent = 'Error fetching data';
  });