## Overview
Kartpool is a delivery platform designed to connect local consumers with nearby stores.
Built off of [this](https://github.com/booleanhunter-tech-blog/kartpool-boilerplate) which provided the frontend design and a pretty good tutorial for backend design.

## Key Features

- **Store Discovery**: Uses PostgreSQL with PostGIS for location-based search. Displays nearby stores user wishlists.
- **Wishlist System**: Users create and manage lists of needed goods. Wishlists are public, allowing community-driven fulfillment.
- **Community Fulfillment Model (Wishmaster System)**: Residents can volunteer to fulfill nearby wishlist requests. 
- **Engagement and Recognition**: A Karma Points system rewards users who help others. Points act as a trust metric within the platform.

## Technology Stack

- **Backend**: Django (Python) with rest framework for API
- **Database**: PostgreSQL with PostGIS for geospatial queries
- **Frontend**: HTML, CSS, JavaScript
- **Mapping Services**: Mapbox for interactive maps, OpenStreetMap for location data


## Future Improvements

-  A Karma Points system rewards users who help others where points act as a trust metric within the platform.
- Right now there is only data for San Diego. Make some way to pull proper location data from OSM when searching any area in the app.
- Add some kind of priority system to wishlists to ensure more important requests are seen at the top of the nearby tab.
- Add some password and sign in function for users.
- Actually host this somewhere and not just mess around with it on my local system.
