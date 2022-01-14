# Welcome to Spacestagram!

Shopify has extended their mission to Make Commerce Better for Everyone to include the whole entire universe. To help in this mission, Spacestagram was created to facilitate image-sharing from the final frontier!:rocket:

With the help of NASA's Astronomy Photo of the Day (APOD) API, users can scroll through incredible interstellar photos and learn more about about our galaxy!

### Built With

* [React](https://reactjs.org/docs/getting-started.html)
* [Shopify Polaris](https://polaris.shopify.com/)
* [NASA Astronomy Photo of the Day (APOD) API](https://apod.nasa.gov/apod/astropix.html)

# Features
* Feed of photos that were featured as NASA's Astronomy Photo of the Day, organized in three columns
* Date selector to choose range of photos displayed in feed
* "Load more" button to load additional posts; displayed when end of feed is reached
* Pop-up modals to view full description and details of posts
* Buttons for copying shareable image links to clipboard
* Loading state while data is fetched from NASA's API (initial data fetch + data fetches from "load more" button)
* Animated "like" and "unlike" buttons

# Other Notes
* Occasionally, NASA uses a video instead of a photo for APOD. Days where a video is used instead of photo are excluded from the feed of posts on Spacestagram.

# Usage
Hosted live using GitHub Pages at [Spacestagram](https://adatias.github.io/spacestagram)