import * as result from "./results.js";

main();

async function main() {
    await buildMembersList();
    displayMembers(members);
    await buildResultsList();
    displayResults(fixedResults);
}

const members = [];
const fixedResults = [];

async function fetchMembers() {
    const resp = await fetch("members.json");
    const data = await resp.json();
    return data;
}

async function fetchResults() {
    const resp = await fetch("results.json");
    const data = await resp.json();
    return data;
}

async function buildMembersList() {
    const originalObjects = await fetchMembers();

    for (const orgobj of originalObjects) {
        const memberObj = constructMember(orgobj);
        members.push(memberObj);
    }
}

async function buildResultsList() {
    const originalObjects = await fetchResults();

    for (const orgobj of originalObjects) {
        const resultObj = result.constructResult(orgobj);
        fixedResults.push(resultObj);
    }
}

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

function constructMember(memberdata) {
    const MemberObject = {
        id: memberdata.id,
        name: memberdata.firstName,
        active: memberdata.isActiveMember,
        competitive: memberdata.isCompetitive,
        birthday: new Date(memberdata.dateOfBirth),
        email: memberdata.email,
        gender: memberdata.gender,
        image: memberdata.image,
        hasPayed: memberdata.hasPayed,
        setDate() {
            this.birthday = new Intl.DateTimeFormat("da-DK", { dateStyle: "medium" }).format(this.birthday);
        },
        getAge() {
            const birthday = new Date(memberdata.dateOfBirth);
            const timeNow = Date.now();
            const dateDifference = timeNow - birthday.getTime();
            const age = dateDifference / (1000 * 60 * 60 * 24 * 365.25);
            this.age = Math.floor(age);
        },
        get JuniorSeniorStatus() {
            if (this.age < 18) {
                return "Junior";
            } else {
                return "Senior";
            }
        },
    };
    MemberObject.setDate();
    MemberObject.getAge();

    return MemberObject;
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
