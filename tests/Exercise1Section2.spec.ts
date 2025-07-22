import { test, expect, Page } from "@playwright/test";

test.describe("Book a tour", { tag: ["@exercise", "@exercise1"] }, () => {
  let newPage: Page;
  let email: string;
  let password: string;
  let paymentPage: Page;

  test.beforeEach(async ({ page }) => {
    page.goto("https://www.phptravels.net/");
    expect(page.locator('h4[class="text-white display-6 fw-bold"]')).toHaveText(
      "Your Trip Starts Here!"
    );
  });

  test("Book Thailand tour successfully", async ({ page }) => {
    await test.step("Click tour tab", async () => {
      await page.locator('a:has-text("Tours")').click();
      expect(page.locator("h2")).toHaveText("Find Best Tours");
    });

    await test.step("Select destination", async () => {
      await page.locator('span[class="selection"]').click();
      await page
        .locator('input[class="select2-search__field"]')
        .fill("Thailand");
      await page.getByRole("option", { name: "Thailand, Thailand" }).click();
    });

    await test.step("Set Departure Date", async () => {
      await page.evaluate(() => {
        const dateInput = document.querySelector("#date") as HTMLInputElement;
        if (dateInput) {
          dateInput.removeAttribute("readonly");
          dateInput.value = "14-07-2025";
        }
      });
    });

    await test.step("Enter Traveler Count", async () => {
      await page.locator(".travellers").click();
      await page.locator('input[name="adults"]').fill("1");
    });

    await test.step("Click search button", async () => {
      await page.locator('button[type="submit"]').click();
    });

    await test.step('Select "View Details" for your preferred trip', async () => {
      [newPage] = await Promise.all([
        page.context().waitForEvent("page"),
        page.locator('a:has-text("View More")').click(),
      ]);
      await newPage.getByRole("button", { name: "Book Now" }).click();
    });

    await test.step("Fill in all required information and Select PayPal as your payment option and Click Book Now", async () => {
      await newPage.locator("#p-first-name").fill("Nhat");
      await newPage.locator("#p-last-name").fill("Huynh");
      await newPage.locator("#p-email").fill("hmnhattt@gmail.com");
      await newPage.locator("#p-address").fill("2 Tan Vien");
      await newPage.locator("#p-phone").fill("0916854821");
      await newPage
        .locator('select[class="nationality selectpicker w-100"]')
        .selectOption({ value: "VN" });
      await newPage
        .locator('select[class="country selectpicker w-100"]')
        .selectOption({ value: "VN" });
      await newPage.locator("#p-first-name").fill("Nhat");
      await newPage.locator('input[name="firstname_1"]').fill("Nhat");
      await newPage.locator('input[name="lastname_1"]').fill("Huynh");
      await newPage.locator('input[value="paypal"]').click();
      await newPage.locator("input[class='form-check-input']").click();
      await newPage.getByRole("button", { name: "Booking Confirm" }).click();
      await expect(newPage.locator('span[class="text-danger"]')).toHaveText(
        "unpaid"
      );
      await expect(newPage.locator('span[class="text-success"]')).toHaveText(
        "pending"
      );
    });

    await test.step("Click proceed button", async () => {
      await newPage.waitForTimeout(3000);
      await newPage.locator("#form").click();
    });

    await test.step("Record Paypal account email and password", async () => {
      const fullTextEmail = await newPage
        .locator('p:has-text("Email")')
        .textContent();
      email = (fullTextEmail ?? "").replace("Email", "").trim();
      const fullTextPassword = await newPage
        .locator('p:has-text("Password")')
        .textContent();
      password = (fullTextPassword ?? "").replace("Password", "").trim();
    });

    await test.step("Click the PayPal payment button", async () => {
      let iframe = await newPage.frameLocator(
        'iframe[class="component-frame visible"]'
      );
      [paymentPage] = await Promise.all([
        newPage.waitForEvent("popup"),
        await iframe.getByRole("link", { name: "PayPal" }).click(),
      ]);

      await paymentPage.waitForLoadState("domcontentloaded");
    });

    await test.step("Input Paypal account with account email and password you have recorded", async () => {
      await paymentPage.waitForTimeout(5000);
      await paymentPage.locator("#email").fill(email);
      await paymentPage.locator("#btnNext").click();
      await paymentPage.locator("#password").fill(password);
      await paymentPage.locator("#btnLogin").click();
    });

    await test.step("Complete purchase", async () => {
      await paymentPage.waitForTimeout(10000);
      await paymentPage.locator('button:has-text("Complete Purchase")').click();

      await expect(newPage.locator('span[class="text-danger"]')).toHaveText(
        "paid"
      );
      await expect(newPage.locator('span[class="text-success"]')).toHaveText(
        "confirmed"
      );
    });
  });
});
