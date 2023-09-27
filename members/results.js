export function constructResult(resultData) {
    const resultObject = {
        memberId: resultData.memberId,
        date: new Date(resultData.date),
        resultType: resultData.resultType,
        resultDiscipline: resultData.discipline,
        time: resultData.time,
        set MemberName(memberObject) {
            this.memberId = memberObject.name;
        },
        get MemberName() {
            return this.memberId;
        },
        get ResultType() {
            if (this.resultType === "competition") {
                return true;
            }
            return false;
        },
    }

    return resultObject;
}