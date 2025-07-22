import { test, expect, Page } from "@playwright/test";

test.describe("Authentication", { tag: ["@exercise", "@exercise2"] }, () => {
    
  test.beforeEach(async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
  
  });

  test("Login successfully and verify personal information", async ({
    page,
  }) => {
    await test.step("Input valid credentials for the account created at pre-condition", async () => {
      await page
        .getByRole("textbox", { name: "Username" })
        .fill("nhathuynh2904");
      await page
        .getByRole("textbox", { name: "Password" })
        .fill("GoMobile!123");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page).toHaveURL(
        "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
      );
      const a = page.context().newPage();
    });

    await test.step("Go to My Info tab", async () => {
      await page.getByRole("link", { name: "My Info" }).click();
      await expect(
        page.getByRole("textbox", { name: "First Name" })
      ).toHaveValue("Nhat");
      await expect(
        page.getByRole("textbox", { name: "Middle Name" })
      ).toHaveValue("Huynh");
      await expect(
        page.getByRole("textbox", { name: "Last Name" })
      ).toHaveValue("Minh");
    });
  });

  test("Login unsuccessfully", async ({ page }) => {
    await test.step("Leave the username with a blank value", async () => {
      await page.getByRole("textbox", { name: "Username" }).fill("");
      await page
        .getByRole("textbox", { name: "Password" })
        .fill("GoMobile!123");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(
        page.locator("span.oxd-input-field-error-message")
      ).toHaveText("Required");
    });
  });
});
