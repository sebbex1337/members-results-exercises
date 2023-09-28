export function construct() {
    const listRenderer = {
        render() {
            const html = /*html*/ `
                <tr>
                    <td>${member.name}</td>
                    <td>${convertActiveDisplay(member.active)}</td>
                    <td>${member.birthday}</td>
                    <td>${member.age}</td>
                    <td>${convertJuniorSenior(member.JuniorSeniorStatus)}</td>
                    <td>${member.email}</td>
                </tr>`;
            return html;
        },
    };
    return listRenderer;
}
