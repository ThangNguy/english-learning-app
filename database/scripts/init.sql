-- SQL script to initialize the database for the English Learning application

CREATE DATABASE EnglishLearning;

USE EnglishLearning;

CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    PasswordHash NVARCHAR(256) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Vocabulary (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Word NVARCHAR(100) NOT NULL,
    Definition NVARCHAR(500) NOT NULL,
    ExampleSentence NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE GrammarTopics (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Topic NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Exercises (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);