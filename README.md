# Pokemon App: Vanilla JavaScript API Engineering

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

A high-performance, responsive encyclopedia built with **Vanilla JavaScript** and the **PokeAPI**. This project demonstrates advanced frontend engineering techniques including custom state management, debounced searching, and lazy-loading, all without the use of external frameworks.

<img width="1671" height="891" alt="Pokemon_2" src="https://github.com/user-attachments/assets/3da00426-20ad-445f-bd8a-0196ec522629" />


## Technical Features

* **Asynchronous Service Layer:** Encapsulated Fetch API calls with robust error handling and loading states.
* **Intersection Observer API:** Implemented **Lazy Loading** for images to optimize initial page load and reduce data consumption.
* **Debounced Search Engine:** A custom 300ms debounce prevents API rate-limiting and ensures a smooth UI during rapid typing.
* **Local Storage Persistence:** A custom wrapper allows users to "Favorite" Pokémon, persisting data across browser sessions.
* **Accessibility (A11y):** Semantic HTML5, ARIA labels, and full keyboard navigation support for modals and search inputs.

---

## 🛠️ Architecture

This project follows a **Modular ES6 Architecture** to maintain a clean separation of concerns:

```text
├── js/
│   ├── scripts.js       # Main Application Logic & State Management
│   ├── api.js           # API Service Layer (Fetch/Parsing)
│   └── ui.js            # DOM Manipulation & Modal Handling
├── css/
│   └── styles.css       # Custom CSS3 overrides for Bootstrap
├── index.html           # Semantic HTML5 Structure
└── README.md
```

## Performance Highlight

### 1. Debounce Logic
To protect the public API from unnecessary requests, I implemented a debounce function. This ensures that the fetch operation only triggers once the user has stopped typing for a specific duration.

### 2. Lazy Loading
Using the Intersection Observer API, the app only requests high-resolution sprites when the Pokémon card enters the user's viewport, significantly improving the Lighthouse performance score.

## Engineering Insight
* **Framework-less Components:** I chose to build reusable UI logic using JavaScript functions rather than React components to master the underlying DOM API.
* **Responsive Strategy:**  Iutilized the Bootstrap 5 Grid System customized with CSS Flexbox to ensure a seamless experience from mobile devices to ultra-wide monitors.
* **State Management:** I managed application state (search queries, filtered lists) through pure functions, ensuring data consistency across the UI.

### Installation

### 1. Clone the Repo
```bash
git clone [https://github.com/Mancini-Developer80/PokemonAppBootstrap.git](https://github.com/Mancini-Developer80/PokemonAppBootstrap.git)
```
### 2.
Open in Browser Simply open index.html in your browser or use a "Live Server" extension in VS Code.






