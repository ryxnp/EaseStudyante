// grades.js

import { getFirestore } from './firebaseConfig.js';

export async function displayGradesInSection(section) {
    try {
        const firestore = getFirestore();
        const briStudentsRef = firestore.collection("Bri_Students");

        const querySnapshot = await briStudentsRef.where("Section", "==", section).get();
        const gradesTableM = document.getElementById('gradesTable-M').getElementsByTagName('tbody')[0];
        const gradesTableA = document.getElementById('gradesTable-A').getElementsByTagName('tbody')[0];
        const gradesTableP = document.getElementById('gradesTable-P').getElementsByTagName('tbody')[0];
        const gradesTableH = document.getElementById('gradesTable-H').getElementsByTagName('tbody')[0];

        // Clear previous content
        gradesTableM.innerHTML = '';
        gradesTableA.innerHTML = '';
        gradesTableP.innerHTML = '';
        gradesTableH.innerHTML = '';

        if (querySnapshot.empty) {
            gradesTableM.innerHTML = '<tr><td colspan="5">No matching documents found</td></tr>';
            gradesTableA.innerHTML = '<tr><td colspan="5">No matching documents found</td></tr>';
            gradesTableP.innerHTML = '<tr><td colspan="5">No matching documents found</td></tr>';
            gradesTableH.innerHTML = '<tr><td colspan="5">No matching documents found</td></tr>';
        } else {
            for (const doc of querySnapshot.docs) {
                const data = doc.data();

                const ryGradesRef = firestore.collection("Ry_Grades");
                const gradesDoc = await ryGradesRef
                    .where("UID", "==", data.UID)
                    .where("ID", "==", data.StudentID)
                    .limit(1)
                    .get();

                const defaultGrades = {
                    M_Exam: 0, M_Q1: 0, M_S1: 0, M_S2: 0,
                    A_Exam: 0, A_Q1: 0, A_S1: 0, A_S2: 0,
                    P_Exam: 0, P_Q1: 0, P_S1: 0, P_S2: 0,
                    H_Exam: 0, H_Q1: 0, H_S1: 0, H_S2: 0,
                };

                let updatedGradesData;

                if (gradesDoc.empty) {
                    await ryGradesRef.add({
                        UID: data.UID,
                        ID: data.StudentID,
                        ...defaultGrades,
                    });

                    updatedGradesData = defaultGrades;
                } else {
                    const existingGradesData = gradesDoc.docs[0].data();
                    updatedGradesData = { ...defaultGrades, ...existingGradesData };

                    await ryGradesRef.doc(gradesDoc.docs[0].id).update(updatedGradesData);
                }

                // Construct the student name using FirstName, MiddleName, and LastName
                const studentName = `${data.FirstName || ''} ${data.MiddleName || ''} ${data.LastName || ''}`;

                gradesTableM.innerHTML += createGradesTableRow(studentName, updatedGradesData, 'M');
                gradesTableA.innerHTML += createGradesTableRow(studentName, updatedGradesData, 'A');
                gradesTableP.innerHTML += createGradesTableRow(studentName, updatedGradesData, 'P');
                gradesTableH.innerHTML += createGradesTableRow(studentName, updatedGradesData, 'H');
            }
        }
    } catch (error) {
        console.error('Error fetching and displaying grades:', error);
    }
}

function createGradesTableRow(studentName, gradesData, subject) {
    return `
        <tr>
            <td>${studentName}</td>
            <td>${gradesData[`${subject}_Exam`] || 0}</td>
            <td>${gradesData[`${subject}_Q1`] || 0}</td>
            <td>${gradesData[`${subject}_S1`] || 0}</td>
            <td>${gradesData[`${subject}_S2`] || 0}</td>
        </tr>`;
}
