import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

// Initialize the sp instance for SPFx
const sp = spfi().using(SPFx);

export default class HelloWorldWebPart extends BaseClientSideWebPart<{}> {
  
  public async onInit(): Promise<void> {
    await super.onInit();

    // Template page URL (Replace with the actual template URL)
    const templatePageURL = "https://m365x71180313.sharepoint.com/sites/first/SitePages/Templates/temp-page.aspx";
    // const templatePageURL = "https://m365x71180313.sharepoint.com/sites/first/SitePages/Templates/temp-page.aspx";

// Manually load the template page using REST API
const response = await fetch(`${templatePageURL}/_api/web/getfilebyserverrelativeurl('/sites/first/SitePages/Templates/temp-page.aspx')`);
if (response.ok) {
  const pageData = await response.json();
  console.log("Template Page Loaded:", pageData);
} else {
  console.error("Error loading template page:", response.statusText);
}
    try {
      // Load the template page using PnPjs
      const templatePage = await sp.web.loadClientsidePage(templatePageURL);
      console.log("Template Page Loaded", templatePage);

      // Attempt to create a new page using the template
      const newPageName = "NewPage";
      const newPageTitle = "New Page from Template";
      
     await templatePage.copy(sp.web, newPageName, newPageTitle, true);
      console.log("Page Created");

      // Get the page item ID
      // const pageItemId = newPage[0].Id;
      // if (newPage.length > 0) {
      //   const pageItemId = newPage[0].Id;
      //   console.log("Page Item ID:", pageItemId);
      // } else {
      //   console.error("No page item found!");
      // }
      // console.log("Page Item ID:", pageItemId);

      // Attempt to remove the template flag (this might fail due to SharePoint restrictions)
      await sp.web.lists.getByTitle("Site Pages").items.getById(1).update({
        OData__SPSitePageFlags: null // Try to remove the template flag
      });
      console.log("Template flag removed (if successful)");

    } catch (error) {
      console.error("Error creating page or removing template flag:", error);
    }
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div>
        <h1>Hello, World!</h1>
        <p>Web part content goes here!</p>
      </div>
    `;
  }
}