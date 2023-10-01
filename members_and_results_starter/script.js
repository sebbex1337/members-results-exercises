import { initTabs } from "./tabs.js";
import * as results from "./results.js";
import * as members from "./members.js";
import * as listRenderer from "./listRenderer.js";
import { MemberRenderer } from "./memberRenderer.js";
import { ResultRenderer } from "./resultRenderer.js";

window.addEventListener("load", initApp);

async function initApp() {
    initTabs();
    await members.buildMembersList();
    await results.buildResultsList();
    const membersList = listRenderer.construct(members.membersList, "table#members tbody", MemberRenderer);
    membersList.render();
    const resultsList = listRenderer.construct(results.resultsList, "table#results tbody", ResultRenderer);
    resultsList.render();

    document.querySelector("#name").addEventListener("click", () => {
        membersList.sort("name", "asc");
    });
}
