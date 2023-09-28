function constructMember(memberdata) {
    const MemberObject = {
        id: memberdata.id,
        _name: undefined,
        active: memberdata.isActiveMember,
        competitive: memberdata.isCompetitive,
        _birthday: undefined,
        email: memberdata.email,
        gender: memberdata.gender,
        image: memberdata.image,
        hasPayed: memberdata.hasPayed,
        _age: undefined,
        set name(name) {
            this._name = name;
        },
        get name() {
            return this._name;
        },
        set age(dateOfBirth) {
            const dateOfBirthDate = new Date(dateOfBirth);
            const timeNow = Date.now();
            const dateDifference = timeNow - dateOfBirthDate.getTime();
            const age = dateDifference / (1000 * 60 * 60 * 24 * 365.25);
            this._age = Math.floor(age);
        },
        get age() {
            return this._age;
        },
        set birthday(dateOfBirth) {
            const dateOfBirthDate = new Date(dateOfBirth);
            this._birthday = new Intl.DateTimeFormat("da-DK", { dateStyle: "medium" }).format(dateOfBirthDate);
        },
        get birthday() {
            return this._birthday;
        },
        get JuniorSeniorStatus() {
            if (this.age < 18) {
                return false;
            }
            return true;
        },
    };
    MemberObject.name = `${memberdata.firstName} ${memberdata.lastName}`;
    MemberObject.age = memberdata.dateOfBirth;
    MemberObject.birthday = memberdata.dateOfBirth;
    Object.defineProperty(MemberObject, "id", { writable: false });
    Object.defineProperty(MemberObject, "name", { enumerable: false });
    Object.defineProperty(MemberObject, "image", { enumerable: false });

    return MemberObject;
}

export const membersList = [];

async function fetchMembers() {
    const res = await fetch("./data/members.json");
    return await res.json();
}

export async function buildMembersList() {
    const originalObjects = await fetchMembers();

    for (const orgobj of originalObjects) {
        const memberObj = constructMember(orgobj);
        membersList.push(memberObj);
    }
}
