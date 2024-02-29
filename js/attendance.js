// attendance.js

import { getFirestore } from './firebaseConfig.js';

export async function displayAttendanceInSection(section) {
    try {
        const firestore = getFirestore();
        const briStudentsRef = firestore.collection("Bri_Students");

        const querySnapshot = await briStudentsRef.where("Section", "==", section).get();
        const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];

        // Clear previous content
        attendanceTable.innerHTML = '';

        if (querySnapshot.empty) {
            attendanceTable.innerHTML = '<tr><td colspan="4">No matching documents found</td></tr>';
        } else {
            for (const doc of querySnapshot.docs) {
                const data = doc.data();

                if (!data.UID || !data.StudentID) {
                    console.error('UID or ID is missing in the document:', doc.id);
                    continue; 
                }

                const ryAttendanceRef = firestore.collection("Ry_Attendance");
                const attendanceQuerySnapshot = await ryAttendanceRef
                    .where("UID", "==", data.UID)
                    .where("ID", "==", data.StudentID)
                    .get();

                if (attendanceQuerySnapshot.empty) {
                    attendanceTable.innerHTML += `
                        <tr>
                            <td>${data.FirstName} ${data.MiddleName || ''} ${data.LastName || ''}</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td class="status"><div class="circle gray"></div></td>
                        </tr>`;
                } else {
                    for (const attendanceDoc of attendanceQuerySnapshot.docs) {
                        const attendanceData = attendanceDoc.data();
                        const timeIn = attendanceData.timeIn ? attendanceData.timeIn.toDate().toLocaleString() : "N/A";
                        const timeOut = attendanceData.timeOut ? attendanceData.timeOut.toDate().toLocaleString() : "N/A";

                        const statusColor = isPresentToday(attendanceData.timeIn) ? 'green' : 'red';

                        attendanceTable.innerHTML += `
                            <tr>
                                <td>${data.FirstName} ${data.MiddleName || ''} ${data.LastName || ''}</td>
                                <td>${timeIn}</td>
                                <td>${timeOut}</td>
                                <td class="status"><div class="circle ${statusColor}"></div></td>
                            </tr>`;
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching and displaying attendance:', error);
    }
}

function isPresentToday(date) {
    const today = new Date();
    return date && date.toDate().toDateString() === today.toDateString();
}
