import { Selector } from 'testcafe'

fixture`Getting started with TestCafe`
	.page`https://devexpress.github.io/testcafe/example/`
	.before(async t => {
		// Test setup code goes here
		// await runDatabaseReset()
		// await seedTestData()
	})
	.beforeEach(async t => {
		// Runs before each test
		await t.setTestSpeed(1)
		//await test.timeouts({ pageLoadTimeout: 10000 })
	})
	.after(async t => {
		// Cleaning test data
		// Logging and sending data to monitoring systems
	})
	.afterEach(async t => {
		// Runs after each test
	})

test.timeouts({ pageLoadTimeout: 10000 })('My first testcafe test', async t => {
	//here goes testcafe code
	const developerNameInput = Selector('#developer-name')
	const submitButton = Selector('#submit-button')
	const articleHeader = Selector('#article-header').innerText

	//await t.takeScreenshot({ fullPage: true })
	await t.typeText(developerNameInput, 'John')
	//await t.wait(3000)
	await t.click(submitButton)
	await t.expect(articleHeader).contains('John')
})
