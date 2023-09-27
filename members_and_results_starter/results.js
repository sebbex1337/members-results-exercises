import { getMemberById } from "./script.js";

export function constructResult(resultData) {
    const resultObject = {
        id: resultData.id,
        memberId: resultData.memberId,
        _member: undefined,
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
    resultObject.member = getMemberById(resultData.memberId);
    resultObject.name = resultObject.member.name;
    Object.defineProperty(resultObject, "id", { writable: false });

    return resultObject;
}
