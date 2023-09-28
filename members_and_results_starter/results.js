import * as members from "./members.js";

function constructResult(resultData) {
    const resultObject = {
        id: resultData.id,
        memberId: resultData.memberId,
        _member: {},
        date: new Date(resultData.date),
        resultType: resultData.resultType,
        resultDiscipline: resultData.discipline,
        _time: undefined,
        _name: undefined,
        get ResultType() {
            if (this.resultType === "competition") {
                return true;
            }
            return false;
        },
        get time() {
            return this._time;
        },
        set time(time) {
            this._time = time;
        },
        get member() {
            return this._member;
        },
        set member(memberObject) {
            if (memberObject.id === this.memberId) {
                this._member = memberObject;
            }
        },
        get name() {
            return this._name;
        },
        set name(name) {
            this._name = name;
        },
    };
    resultObject.time = resultData.time;
    /* const member = getMemberById(resultObject.memberId);
    console.log(member);
    resultObject.member = member;
    console.log(resultObject.member); */
    // console.log(member);
    // resultObject.name = resultObject.member.name;
    Object.defineProperty(resultObject, "id", { writable: false });

    return resultObject;
}

function getMemberById(id) {
    for (const member of members.membersList) {
        if (member.id === id) {
            return member;
        }
    }
}

export const resultsList = [];

async function fetchResults() {
    const res = await fetch("./data/results.json");
    return await res.json();
}

export async function buildResultsList() {
    const originalObjects = await fetchResults();

    for (const orgobj of originalObjects) {
        const resultObj = constructResult(orgobj);
        resultsList.push(resultObj);
    }
}
