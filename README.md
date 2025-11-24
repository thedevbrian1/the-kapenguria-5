# Mazingira 360

Mazingira 360 is a community-driven platform dedicated to protecting Kenya's forests. It empowers citizens to report environmental threats, engage in conservation actions (like tree planting), and access educational resources to earn rewards.

![Mazingira 360 Hero](/public/forest.jpg)

##  Features

- **User Dashboard**: Personalized view for tracking activities and points.
- **Action Hub**: Log and track positive conservation efforts (e.g., Tree Planting).
- **Reporting System**: Secure channel to report environmental incidents (e.g., Illegal logging, Fires).
- **Learning Hub**: Educational courses and video lessons on conservation.
- **Gamification**: Earn points and "Coins" for contributing to the platform.
- **Authentication**: Secure Sign-up and Login via Supabase.

## 🛠️ Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) (formerly Remix)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database/Auth**: Supabase
- **Image Storage**: Cloudinary
- **Icons**: Lucide React
- **Tooling**: Vite, Biome/Prettier

##  API Documentation

Explore the backend endpoints and test requests directly via the Swagger UI:

 **[Swagger API Documentation](https://wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com/swagger/)**

##  Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/thedevbrian1/the-kapenguria-5.git](https://github.com/thedevbrian1/the-kapenguria-5.git)
    cd the-kapenguria-5
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following keys:
    ```env
    # Supabase
    SUPABASE_PROJECT_URL=your_supabase_url
    SUPABASE_PUBLIC_API_KEY=your_supabase_anon_key
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    
    # Session
    SESSION_SECRET=your_secret_key
    
    # API Endpoint
    BASE_URL_ENDPOINT=[http://wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com](http://wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com)
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 🐳 Docker

To build and run the application using Docker:

```bash
docker build -t mazingira-360 .
docker run -p 3000:3000 mazingira-360