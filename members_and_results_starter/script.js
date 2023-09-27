import { initTabs } from "./tabs.js";
import * as results from "./results.js";
import * as members from "./members.js";

window.addEventListener("load", initApp);

const membersList = [];
const resultsList = [];

async function initApp() {
    initTabs();
    await buildMembersList();
    await buildResultsList();
    // TODO: Make the rest of the program ...
}

async function fetchMembers() {
    const res = await fetch("./data/members.json");
    return await res.json();
}

async function fetchResults() {
    const res = await fetch("./data/results.json");
    return await res.json();
}

async function buildMembersList() {
    const originalObjects = await fetchMembers();

    for (const orgobj of originalObjects) {
        const memberObj = members.constructMember(orgobj);
        membersList.push(memberObj);
    }
}

async function buildResultsList() {
    const originalObjects = await fetchResults();

    for (const orgobj of originalObjects) {
        const resultObj = results.constructResult(orgobj);
        resultsList.push(resultObj);
    }
}

export function getMemberById(id) {
    for (const member of membersList) {
        if (member.id === id) {
            return member;
        }
    }
}

// DISPLAY FUNCTIONS
function displayMembers(members) {
    const table = document.querySelector("table#members tbody");
    table.innerHTML = "";
    for (const member of members) {
        const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td>${member.birthday}</td>
      <td>${member.age}</td>
      <td>${member.JuniorSeniorStatus}</td>
      <td>${member.email}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
    }
}

function displayResults(listOfResults) {
    const table = document.querySelector("#results tbody");
    table.innerHTML = "";
    for (const result of listOfResults.sort((result1, result2) => result1.time.localeCompare(result2.time))) {
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
    for (const member of members) {
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
