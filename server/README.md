# English Learning API

This is the server-side component of the English Learning project, built using C# and ASP.NET Core. The API serves as the backend for the English Learning application, providing endpoints for vocabulary, grammar, and exercises.

## Project Structure

- **EnglishLearning.API**: Contains the main API project.
  - **Controllers**: Contains the controllers that handle HTTP requests.
    - `VocabularyController.cs`: Manages vocabulary-related requests.
    - `GrammarController.cs`: Manages grammar-related requests.
    - `ExercisesController.cs`: Manages exercise-related requests.
  - **Models**: Contains data models used by the API.
  - **Services**: Contains services that implement business logic.
  - **Data**: Contains data access components.
    - `ApplicationDbContext.cs`: Defines the database context for Entity Framework.
    - **Repositories**: Contains repository classes for data access.
    - **Migrations**: Contains migration files for database schema changes.
  - `Program.cs`: Entry point of the API application.
  - `Startup.cs`: Configures services and the application's request pipeline.
  - `appsettings.json`: Configuration settings for the API, including connection strings.

- **EnglishLearning.Core**: Contains core business logic and entities.
  - **Entities**: Core entities used in the application.
  - **Interfaces**: Interfaces for services and repositories.
  - **Services**: Core services for business logic.

- **EnglishLearning.Infrastructure**: Contains implementations of data access and services.
  - **Data**: Contains implementation of repositories.
  - **Services**: Contains implementation of services.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/english-learning.git
   ```

2. Navigate to the server directory:
   ```
   cd english-learning/server/EnglishLearning.API
   ```

3. Restore the dependencies:
   ```
   dotnet restore
   ```

4. Update the connection string in `appsettings.json` to point to your SQL Server database.

5. Run the application:
   ```
   dotnet run
   ```

## API Endpoints

- **Vocabulary**: `/api/vocabulary`
- **Grammar**: `/api/grammar`
- **Exercises**: `/api/exercises`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.