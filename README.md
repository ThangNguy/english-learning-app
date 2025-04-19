# English Learning Project

## Overview
The English Learning project is a web application designed to help users learn English through various interactive components. The project is structured into two main parts: a client-side application built with Angular and a server-side API developed in C# using ASP.NET Core. The application also utilizes SQL Server for data storage.

## Project Structure
The project is organized as follows:

```
english-learning
├── client                  # Angular client application
│   ├── src
│   │   ├── app
│   │   │   ├── components  # Reusable components
│   │   │   │   └── shared
│   │   │   ├── models      # TypeScript models
│   │   │   ├── services    # Business logic and data retrieval
│   │   │   ├── pages       # Application pages
│   │   │   │   ├── home
│   │   │   │   ├── vocabulary
│   │   │   │   ├── grammar
│   │   │   │   └── exercises
│   │   │   ├── app.module.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.ts
│   │   │   └── app.component.html
│   │   ├── assets          # Static assets
│   │   ├── environments     # Environment configurations
│   │   ├── index.html      # Main HTML file
│   │   └── styles.scss     # Global styles
│   ├── angular.json        # Angular CLI configuration
│   ├── package.json        # Project dependencies and scripts
│   ├── tsconfig.json       # TypeScript configuration
│   └── README.md           # Client-side documentation
├── server                  # C# server application
│   ├── EnglishLearning.API
│   │   ├── Controllers     # API controllers
│   │   ├── Models          # Data models
│   │   ├── Services        # Business logic services
│   │   ├── Data           # Data access layer
│   │   ├── Program.cs      # Entry point of the API
│   │   ├── Startup.cs      # Application configuration
│   │   └── appsettings.json # API configuration settings
│   ├── EnglishLearning.Core # Core business logic
│   ├── EnglishLearning.Infrastructure # Data access implementation
│   ├── EnglishLearning.sln  # Solution file
│   └── README.md           # Server-side documentation
├── database                # Database setup
│   ├── scripts             # SQL scripts
│   └── README.md           # Database documentation
└── README.md               # Overall project documentation
```

## Features
- **Vocabulary Learning**: Interactive components for learning new words and their meanings.
- **Grammar Exercises**: Tools and exercises to improve grammar skills.
- **Practice Exercises**: Various exercises to test and reinforce learning.
- **User-Friendly Interface**: A responsive and intuitive UI built with Angular.

## Getting Started
To get started with the project, follow these steps:

1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   ```

2. **Set Up the Database**: 
   - Navigate to the `database/scripts` directory and run the SQL scripts to initialize and seed the database.

3. **Run the Server**: 
   - Navigate to the `server` directory and run the API using your preferred method (e.g., using Visual Studio or the command line).

4. **Run the Client**: 
   - Navigate to the `client` directory and install the dependencies:
     ```
     npm install
     ```
   - Start the Angular application:
     ```
     ng serve
     ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.