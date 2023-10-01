export const ResultRenderer = {
    render(result) {
        const html = /* html */ `
        <tr>
            <td>${result.date.toLocaleString("da-DK", { dateStyle: "medium" })}</td>
            <td>${result.name}</td>
            <td>${convertDisciplineToDanish(result.resultDiscipline)}</td>
            <td>${result.ResultType ? "stævne" : "træning"}</td>
            <td>${result.time}</td>
      </tr>`;
        return html;
    },
};

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
