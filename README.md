# Interactive Portfolio (XMB-style)

This is my personal portfolio website, It features a unique, keyboard-navigable interface inspired by the PlayStation Cross-Media Bar (XMB). It caters to implement and showcase different skillsets and will be refactor as i grow professionally.

**[View the Live Demo](https://svinaymd.github.io/interactive-portfolio-xmb/)**

## ✨ Features

*   **Intuitive XMB Interface**: Navigate through sections with a familiar, console-like experience.
*   **Fully Keyboard-Navigable**: Designed for accessibility and a true console feel.
*   **Internationalization (i18n)**: Supports both English and Spanish, with content dynamically loaded.
*   **Responsive Design**: A clean and functional layout on both desktop and mobile devices.
*   **Comprehensive Test Suite**: End-to-end tests built with Playwright to ensure quality and stability across platforms.

## 🛠️ Technologies Used

*   **Frontend**: HTML5, CSS3, modern JavaScript (ES6+)
*   **Testing**: [Playwright](https://playwright.dev/) for E2E testing
*   **Platform**: [Node.js](https://nodejs.org/)

## 🚀 Getting Started

To run this project locally or contribute, follow these steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/download/) (version 20.x or later) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SVinayMD/interactive-portfolio-xmb.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd interactive-portfolio-xmb
    ```

3.  **Install the dependencies:**
    This command reads the `package.json` file and downloads all the necessary libraries (like Playwright and a local server) into the `node_modules` folder.
    ```bash
    npm install
    ```

## 🏃‍♂️ Running the Project Locally

To view the portfolio on a local server, run the following command. This will start a server and make the site available at `http://localhost:8080`.

```bash
npm start
```

## 🧪 Running the Tests

This project includes a comprehensive test suite to validate its functionality across different browsers and devices.

1.  **Run all tests:**
    This command will execute the entire test suite.
    ```bash
    npm test
    ```

2.  **View the test report:**
    After running the tests, you can view a detailed, interactive HTML report of the results.
    ```bash
    npx playwright show-report
    ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- The UI/UX is heavily inspired by the **Sony PlayStation Cross-Media Bar (XMB)**.