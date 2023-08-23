import { expect, test as setup } from '@playwright/test'
import { loadEnv } from 'vite'

const authFile = 'playwright/.auth/user.json'

const env = loadEnv('', process.cwd()) as ImportMetaEnv

setup('authenticate', async ({ page }) => {
  await page.goto(env.VITE_APP_URL)
  await page.getByPlaceholder('Enter your Email').fill(env.VITE_LOGIN_USER)
  await page.getByPlaceholder('Enter your Password').fill(env.VITE_LOGIN_PASSWORD)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByRole('heading', { name: 'Quotes Organizer' })).toBeVisible()

  await page.context().storageState({ path: authFile })
})
