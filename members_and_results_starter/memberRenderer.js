export const MemberRenderer = {
    render(member) {
        const html = /* html */ `
        <tr>
            <td>${member.name}</td>
            <td>${member.active ? "Aktiv" : "Ikke Aktiv"}</td>
            <td>${member.birthday}</td>
            <td>${member.age}</td>
            <td>${member.JuniorSeniorStatus ? "Senior" : "Junior"}</td>
            <td>${member.email}</td>
        </tr>`;
        return html;
    },
};
