import React, { useState } from 'react';
import './App.css';

// Base Person class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }

    introduce() {
        return `Hello, I'm ${this.name}`;
    }

    getRole() {
        return "Person";
    }

    getColorClass() {
        return "person-color"; // Gray
    }
}

// Student class extends Person
class Student extends Person {
    constructor(name, age, grade, course) {
        super(name, age);  // Call parent constructor
        this.grade = grade;
        this.course = course;
    }

    // Override parent method
    displayInfo() {
        return `${super.displayInfo()}, Grade: ${this.grade}, Course: ${this.course}`;
    }

    // Override parent method
    introduce() {
        return `${super.introduce()} and I'm a student studying ${this.course}`;
    }

    getRole() {
        return "Student";
    }

    getColorClass() {
        return "student-color"; // Blue
    }

    // Student-specific method
    study() {
        return `${this.name} is studying ${this.course}`;
    }

    isEligibleForGraduation() {
        return this.grade >= 12;
    }
}

// Teacher class extends Person
class Teacher extends Person {
    constructor(name, age, subject, department, experience = 5) {
        super(name, age);  // Call parent constructor
        this.subject = subject;
        this.department = department;
        this.experience = experience;
    }

    // Override parent method
    displayInfo() {
        return `${super.displayInfo()}, Subject: ${this.subject}, Department: ${this.department}`;
    }

    // Override parent method
    introduce() {
        return `${super.introduce()} and I teach ${this.subject} in the ${this.department} department`;
    }

    getRole() {
        return "Teacher";
    }

    getColorClass() {
        return "teacher-color"; // Green
    }

    // Teacher-specific method
    teach() {
        return `${this.name} is teaching ${this.subject}`;
    }

    isSeniorTeacher() {
        return this.experience >= 10;
    }
}

function App() {
    // Create sample data
    const [people] = useState([
        new Person("John Doe", 30),
        new Student("Alice Johnson", 20, 12, "Computer Science"),
        new Teacher("Dr. Smith", 45, "Mathematics", "Science", 15)
    ]);

    const [selectedPerson, setSelectedPerson] = useState(null);
    const [output, setOutput] = useState("");

    const getRoleIcon = (person) => {
        if (person instanceof Student) return 'S';
        if (person instanceof Teacher) return 'T';
        return 'P';
    };

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
        setOutput(`✅ Selected: ${person.displayInfo()}`);
    };

    const handleIntroduce = () => {
        if (selectedPerson) {
            setOutput(`🗣️ Introduction:\n${selectedPerson.introduce()}`);
        }
    };

    const handleSpecificAction = () => {
        if (!selectedPerson) return;

        let result = "";
        if (selectedPerson instanceof Student) {
            result = `📚 Study Action:\n${selectedPerson.study()}`;
        } else if (selectedPerson instanceof Teacher) {
            result = `👩‍🏫 Teaching Action:\n${selectedPerson.teach()}`;
        } else {
            result = `👤 Basic Action:\n${selectedPerson.name} is just a regular person`;
        }
        setOutput(result);
    };

    const showInheritanceCheck = () => {
        if (!selectedPerson) return;
        
        const checks = [
            `🔍 Inheritance Check for ${selectedPerson.name}:`,
            ``,
            `instanceof Person: ${selectedPerson instanceof Person}`,
            `instanceof Student: ${selectedPerson instanceof Student}`,
            `instanceof Teacher: ${selectedPerson instanceof Teacher}`,
            ``,
            `✨ This shows inheritance hierarchy!`
        ];
        setOutput(checks.join('\n'));
    };

    const showMethodOverriding = () => {
        if (!selectedPerson) return;
        
        const result = [
            `🔄 Method Overriding Demo:`,
            ``,
            `displayInfo() result:`,
            selectedPerson.displayInfo(),
            ``,
            `introduce() result:`,
            selectedPerson.introduce(),
            ``,
            `👆 Same method names, different behavior!`
        ];
        setOutput(result.join('\n'));
    };

    return (
        <div className="app-container">
            {/* Developer Info */}
            <div className="developer-info">
        <p className="developer-name">Developed by Kapil Thakur</p>
        <p className="developer-details">UID: 24BCS80042 | Section: 625 | Group: A</p>
        <p className="developer-guide">Under Guidance of Mayank Sharma</p>
      </div>

            <h1 className="app-title">Person Class Hierarchy Demo</h1>
            <p className="app-subtitle">
                Interactive demonstration of inheritance in JavaScript ES6 classes
            </p>
            
            <div className="main-grid">
                {/* People List */}
                <div className="section">
                    <h2 className="section-title">👥 People ({people.length})</h2>
                    <p className="section-description">
                        Click on any person to select them:
                    </p>
                    {people.map((person, index) => (
                        <div
                            key={index}
                            className={`person-card ${selectedPerson === person ? 'selected' : ''}`}
                            onClick={() => handlePersonClick(person)}
                        >
                            <div className="card-header">
                                <div className="role-info">
                                    <div className={`role-icon ${person.getColorClass()}`}>
                                        {getRoleIcon(person)}
                                    </div>
                                    <div className="person-details">
                                        <div className="person-name">{person.name}</div>
                                        <span className={`role-badge ${person.getColorClass()}`}>
                                            {person.getRole()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="person-description">
                                {person.displayInfo()}
                            </div>
                            {person instanceof Student && (
                                <div className="extra-info student-info">
                                    Graduation Ready: {person.isEligibleForGraduation() ? '✅' : '❌'}
                                </div>
                            )}
                            {person instanceof Teacher && (
                                <div className="extra-info teacher-info">
                                    Senior Teacher: {person.isSeniorTeacher() ? '✅' : '❌'}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions Panel */}
                <div className="section">
                    <h2 className="section-title">
                        {selectedPerson ? `🎯 Actions for ${selectedPerson.name}` : '🎯 Select a Person'}
                    </h2>
                    {selectedPerson ? (
                        <div className="button-group">
                            <button 
                                className="action-button introduce-btn"
                                onClick={handleIntroduce}
                            >
                                🗣️ Introduce Yourself
                            </button>
                            
                            <button 
                                className={`action-button ${selectedPerson.getColorClass()}`}
                                onClick={handleSpecificAction}
                            >
                                {selectedPerson instanceof Student ? '📚 Study' :
                                 selectedPerson instanceof Teacher ? '👩‍🏫 Teach' : '👤 Basic Action'}
                            </button>
                            
                            <button 
                                className="action-button inheritance-btn"
                                onClick={showInheritanceCheck}
                            >
                                🔍 Check Inheritance
                            </button>

                            <button 
                                className="action-button method-btn"
                                onClick={showMethodOverriding}
                            >
                                🔄 Show Method Overriding
                            </button>
                        </div>
                    ) : (
                        <p className="no-selection">
                            Select a person from the left to see available actions
                        </p>
                    )}
                </div>
            </div>

            {/* Output Display */}
            <div className="output-section">
                <h2 className="section-title">📤 Output Console</h2>
                <div className="output-content">
                    {output || "👈 Select a person and click an action button to see results here"}
                </div>
            </div>

            {/* Explanation */}
            <div className="explanation-section">
                <h2 className="section-title">🎓 Key OOP Concepts Demonstrated</h2>
                <ul className="concept-list">
                    <li className="concept-item">
                        <div className="concept-title">🏗️ Inheritance</div>
                        <div className="concept-desc">Student and Teacher classes extend the Person base class using the 'extends' keyword</div>
                    </li>
                    <li className="concept-item">
                        <div className="concept-title">🔄 Method Overriding</div>
                        <div className="concept-desc">Each subclass customizes displayInfo() and introduce() methods while calling parent methods with super()</div>
                    </li>
                    <li className="concept-item">
                        <div className="concept-title">🏗️ Constructor Chaining</div>
                        <div className="concept-desc">Subclass constructors call super() to initialize parent class properties first</div>
                    </li>
                    <li className="concept-item">
                        <div className="concept-title">🎭 Polymorphism</div>
                        <div className="concept-desc">Same method names behave differently for each class - one interface, multiple implementations</div>
                    </li>
                    <li className="concept-item">
                        <div className="concept-title">🔍 instanceof Operator</div>
                        <div className="concept-desc">Check object type and inheritance relationships at runtime</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default App;