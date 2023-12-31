import { expect, test } from '@playwright/test'
import { loadEnv } from 'vite'

const env = loadEnv('', process.cwd()) as ImportMetaEnv
const localUrl = env.VITE_APP_URL

test('has title', async ({ page }) => {
  await page.goto(localUrl)
  await expect(page).toHaveTitle(/Quotes/)
})

test('has app title as heading element', async ({ page }) => {
  await page.goto(localUrl)
  await expect(page.getByRole('heading', { name: 'Quotes Organizer' })).toBeVisible()
})

test('has a searchbar', async ({ page }) => {
  await page.goto(localUrl)
  await expect(page.getByPlaceholder('Search...')).toBeEditable()
})

test('has a button to add a new quote', async ({ page }) => {
  await page.goto(localUrl)
  await expect(page.getByRole('button', { name: 'Add Quote' })).toBeVisible()
})

test('has a list of quotes', async ({ page }) => {
  await page.goto(localUrl)
  await expect(page.getByRole('list')).toBeVisible()
})

test('shows modal when clicking on add quote button', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByTestId('add-modal')).toBeVisible()
})

test('add quote modal has an heading', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByRole('heading', { name: 'Add a new quote' })).toBeVisible()
})

test('add quote modal has a form', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByTestId('add-modal-form')).toBeVisible()
})

test('add quote modal has a content textarea', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByLabel('Content')).toBeVisible()
})

test('add quote modal has a author input', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByLabel('Author')).toBeVisible()
})

test('add quote modal has an add button', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByTestId('add-modal-add')).toBeVisible()
})

test('add quote modal has a cancel button', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByTestId('add-modal-cancel')).toBeVisible()
})

test('add quote modal has a close button', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByTestId('add-modal-close')).toBeVisible()
})

test('on click on close button, modal is closed', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await page.click('[data-testid="add-modal-close"]')
  await expect(page.getByTestId('add-modal')).not.toBeVisible()
})

test('on click on cancel button, modal is closed', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await page.click('[data-testid="add-modal-cancel"]')
  await expect(page.getByTestId('add-modal')).not.toBeVisible()
})

test('add button should be disabled if content is empty', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await expect(page.getByTestId('add-modal-add')).toBeDisabled()
})

test('add button should be enabled if content is not empty', async ({ page }) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await page.getByLabel('Content').fill('__TEST_CONTENT__')
  await expect(page.getByTestId('add-modal-add')).toBeEnabled()
})

test('on click on add button, modal is closed and new quote is add. Then quote can be deleted using trash button', async ({
  page,
}) => {
  await page.goto(localUrl)
  const addButton = page.getByRole('button', { name: 'Add Quote' })
  await addButton.click()
  await page.getByLabel('Content').fill('__TEST_CONTENT__')
  await page.getByLabel('Author').fill('__TEST_AUTHOR__')
  await page.click('[data-testid="add-modal-add"]')
  await expect(page.getByTestId('add-modal')).not.toBeVisible()
  await expect(page.getByText('__TEST_CONTENT__')).toBeVisible()
  await expect(page.getByText('__TEST_AUTHOR__')).toBeVisible()
  await page.click('[data-testid="delete-__TEST_CONTENT__"]')
  await expect(page.getByText('__TEST_CONTENT__')).not.toBeVisible()
  await expect(page.getByText('__TEST_AUTHOR__')).not.toBeVisible()
})
