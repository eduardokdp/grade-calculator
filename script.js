

function showBorder() {
    document.getElementById('result').style.border = "1px solid black";
    document.getElementById('result').style.borderRadius = "5px";
}

function showBorder1() {
    document.getElementById('result1').style.border = "1px solid black";
    document.getElementById('result1').style.borderRadius = "5px";
}

// for final grade calculator
function calculateGradeNeeded() {
    const currentGrade = (document.getElementById('current_grade').value) / 100;
    const targetGrade = (document.getElementById('target_grade').value) / 100;
    const finalExamWeight = (document.getElementById('final_exam_weight').value) / 100;

    let finalExamGrade = ((targetGrade - (1.0 - finalExamWeight) * currentGrade) / finalExamWeight) * 100;
    finalExamGrade = Math.round(finalExamGrade * 100) / 100; // Round to 2 decimal places

    let finalExamGradeNeeded;
    if (Number.isInteger(finalExamGrade)) {
        finalExamGradeNeeded = finalExamGrade.toString();
    } else if (finalExamGrade * 10 % 10 === 0) {
        finalExamGradeNeeded = finalExamGrade.toFixed(1);
    } else {
        finalExamGradeNeeded = finalExamGrade.toFixed(2);
    }
    
    const letter = letterGrade(finalExamGradeNeeded);

    document.getElementById('result').textContent = `Final exam grade needed: ${finalExamGradeNeeded} (%) ${letter}`;
    
    showBorder();
}

function resetDigits() {
    document.getElementById('current_grade').value = "";
    document.getElementById('target_grade').value = "";
    document.getElementById('final_exam_weight').value = "";

    document.getElementById('result').textContent = "";
    document.getElementById('result').style.border = "none";
}

// For weighted grade calculator
function resetChars() {
    const inputs = document.querySelectorAll('.weighted-grade-calculator input[type="text"], .weighted-grade-calculator input[type="number"]');
    inputs.forEach(input => {
        input.value = "";
    });
    document.getElementById('result1').textContent = "";
    document.getElementById('result1').style.border = "none";

    const gradesSection = document.getElementById('grades-section');
    while (gradesSection.children.length > 5) {
        gradesSection.removeChild(gradesSection.lastChild);
    }
}

function calculateFinalGrade() {
    const section = document.getElementById('grades-section');
    const rows = section.getElementsByTagName('div');

    let totalWeight = 0;
    let weightedSum = 0;

    for (let i = 0; i < rows.length; i++) {
        const inputs = rows[i].getElementsByTagName('input');
        const grade = parseFloat(inputs[1].value);
        const weight = parseFloat(inputs[2].value);

        if (!isNaN(grade) && !isNaN(weight)) {
            weightedSum += grade * weight;
            totalWeight += weight;
        }
    }

    const finalGrade = weightedSum / totalWeight;
    const roundedGrade = finalGrade.toFixed(2);

    const letter = letterGrade(roundedGrade);

    document.getElementById('result1').textContent = `Average grade: ${roundedGrade} (%) ${letter}`;

    showBorder1();
}

function letterGrade(givenGrade) {
    givenGrade = parseFloat(givenGrade);
    if (givenGrade >= 97) {
        return "A+";
    } else if (givenGrade >= 93) {
        return "A";
    } else if (givenGrade >= 90) {
        return "A-";
    } else if (givenGrade >= 87) {
        return "B+";
    } else if (givenGrade >= 83) {
        return "B";
    } else if (givenGrade >= 80) {
        return "B-";
    } else if (givenGrade >= 77) {
        return "C+";
    } else if (givenGrade >= 73) {
        return "C";
    } else if (givenGrade >= 70) {
        return "C-";
    } else if (givenGrade >= 67) {
        return "D+";
    } else if (givenGrade >= 63) {
        return "D";
    } else if (givenGrade >= 60) {
        return "D-";
    } else {
        return "F";
    }
}

function addRow() {
    const section = document.getElementById('grades-section');
    const newRow = document.createElement('div');

    newRow.innerHTML = `
        <input type="text" class="assessment-type">
        <input type="number" class="percentage-achieved">
        <input type="number" class="weightage">
    `;

    section.appendChild(newRow);
}
