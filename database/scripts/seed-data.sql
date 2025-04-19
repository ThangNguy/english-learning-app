INSERT INTO Users (Username, PasswordHash, Email) VALUES 
('john_doe', 'hashed_password_1', 'john@example.com'),
('jane_smith', 'hashed_password_2', 'jane@example.com');

INSERT INTO Vocabulary (Word, Definition, ExampleSentence) VALUES 
('aberration', 'a departure from what is normal, usual, or expected', 'The outbreak of violence was an aberration in the city’s peaceful history.'),
('benevolent', 'well-meaning and kindly', 'She was a benevolent old woman who was always ready to help the needy.');

INSERT INTO GrammarRules (Rule, Explanation) VALUES 
('Subject-Verb Agreement', 'The subject and verb must agree in number (singular or plural).'),
('Tense Consistency', 'Maintain the same tense throughout a sentence or related sentences.');

INSERT INTO Exercises (Title, Description) VALUES 
('Vocabulary Quiz', 'Test your knowledge of vocabulary words.'),
('Grammar Correction', 'Identify and correct the grammatical errors in the sentences.');