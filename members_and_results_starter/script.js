import { initTabs } from "./tabs.js";
import * as results from "./results.js";
import * as members from "./members.js";

window.addEventListener("load", initApp);

async function initApp() {
    initTabs();
    await results.buildResultsList();
    await members.buildMembersList();
    displayResults(results.resultsList);
    displayMembers(members.membersList);
}

// DISPLAY FUNCTIONS
function displayMembers(listOfMembers) {
    const table = document.querySelector("table#members tbody");
    table.innerHTML = "";
    for (const member of listOfMembers) {
        const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${convertActiveDisplay(member.active)}</td>
      <td>${member.birthday}</td>
      <td>${member.age}</td>
      <td>${convertJuniorSenior(member.JuniorSeniorStatus)}</td>
      <td>${member.email}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
    }
}

function convertActiveDisplay(active) {
    if (active) {
        return "Aktiv";
    }
    return "Ikke Aktiv";
}

function convertJuniorSenior(juniorSenior) {
    if (juniorSenior) {
        return "Senior";
    }
    return "Junior";
}

function displayResults(listOfResults) {
    const table = document.querySelector("#results tbody");
    table.innerHTML = "";
    for (const result of listOfResults /* .sort((result1, result2) => result1.time.localeCompare(result2.time)) */) {
        const html = /*html*/ `
      <tr>
        <td>${result.date.toLocaleString("da-DK", { dateStyle: "medium" })}</td>
        <td>${convertMemberIdToName(result.memberId)}</td>
        <td>${convertDisciplineToDanish(result.resultDiscipline)}</td>
        <td>${getTypeOfResult(result.ResultType)}</td>
        <td>${result.time}</td>
      </tr>
    `;
        table.insertAdjacentHTML("beforeend", html);
    }
}

function convertMemberIdToName(memberId) {
    for (const member of members.membersList) {
        if (memberId === member.id) {
            return member.name;
        }
    }
}

function convertDisciplineToDanish(discipline) {
    switch (discipline) {
        case "breaststroke":
            return "bryst";
        case "backstroke":
            return "ryg";
        default:
            return discipline;
    }
}

function getTypeOfResult(resultType) {
    if (resultType) {
        return "stævne";
    }
    return "træning";
}
