import { displayAttendanceInSection } from './attendance.js';
import { displayGradesInSection } from './grades.js';


// Apacible
document.getElementById('section-Apacible').addEventListener('click', function () {
    const selectedSection = '9-Apacible';
    console.log('Selected Section:', selectedSection);

    // Display attendance for students in the selected section
    displayAttendanceInSection(selectedSection);

    // Display grades for students in the selected section
    displayGradesInSection(selectedSection);

});

// Agoncillo
document.getElementById('section-Agoncillo').addEventListener('click', function () {
    const selectedSection = '9-Agoncillo';
    console.log('Selected Section:', selectedSection);
    displayAttendanceInSection(selectedSection);
    displayGradesInSection(selectedSection);

});

// Einstein
document.getElementById('section-Einstein').addEventListener('click', function () {
    const selectedSection = '9-Einstein';
    console.log('Selected Section:', selectedSection);
    displayAttendanceInSection(selectedSection);
    displayGradesInSection(selectedSection);

});

// K-Liwayway
document.getElementById('section-K-Liwayway').addEventListener('click', function () {
    const selectedSection = '9-K-Liwayway';
    console.log('Selected Section:', selectedSection);
    displayAttendanceInSection(selectedSection);
    displayGradesInSection(selectedSection);

});

// Lopez-Jaena
document.getElementById('section-Lopez-Jaena').addEventListener('click', function () {
    const selectedSection = '9-Lopez-Jaena';
    console.log('Selected Section:', selectedSection);
    displayAttendanceInSection(selectedSection);
    displayGradesInSection(selectedSection);

});