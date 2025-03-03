# Mood-Syncing 🎵

Mood-Syncing is a music recommendation app that suggests songs based on the user's mood, providing a personalized and immersive experience.

## Features 🎶

- Simple, clean, and interactive UI 🎨
- Authenticate using Spotify OAuth 🔑
- View all user playlists 📂
- View specific playlists and remove songs ❌
- Enter your mood and generate a playlist based on recommendations 🎼

⚠ **Note:** Spotify has deprecated its Seed Genres API, so the mood-based search feature may not work as expected.

## Technologies Used 🛠️

- **Frontend**:
  - ![Vite](https://img.shields.io/badge/Framework-Vite-red?logo=vite&logoColor=white) 
  - ![React.js](https://img.shields.io/badge/Library-React.js-blue?logo=react&logoColor=white)
  - ![TypeScript](https://img.shields.io/badge/Language-TypeScript-green?logo=typescript&logoColor=white)
  
- **APIs**:
  - ![Spotify API](https://img.shields.io/badge/API-Spotify-telloe?logo=spotify&logoColor=white)

- **Deployment**:  
  - ![Netlify](https://img.shields.io/badge/Deployment-Netlify-navy?logo=netlify&logoColor=white)

## Installation ⚙️

To run the Mood-Syncing project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/PRINCERAHUL1/Mood-Syncing.git
    ```

2. Navigate into the project folder:

    ```bash
    cd Mood-Syncing
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Set up Spotify Developer Dashboard:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and log in.
   - Create a new application.
   - Note down the **Client ID** and **Client Secret**.
   - Set the **Redirect URI** to `http://localhost:5173/callback`.
   - Save the changes.

5. Update `SpotifyAuth.tsx`:
   - Modify the redirect URI in the authentication logic to match the one set in the Spotify Developer Dashboard.

6. Run the app:

    ```bash
    npm run dev
    ```

7. Open your browser and go to `http://localhost:5173` to use the application. 🌐

## Contributing 🤝

Contributions are welcome! Feel free to fork this repository and submit a pull request.

1) Fork the Repository
2) Create your Feature Branch
3) Commit your Changes
4) Push to the Branch
5) Open a Pull Request

## Contact 📧

Rahul Mandal - rmrahul258@gmail.com
