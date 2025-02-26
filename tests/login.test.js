import { Selector } from 'testcafe'

//prettier-ignore
fixture `Login Test`
    .page `https://www.saucedemo.com`;

// Login with invalid credentials
test.timeouts({ pageLoadTimeout: 6000 })(
	'User cannot login with invalid credentials',
	async t => {
		const usernameInput = Selector('#user-name')
		const passwordInput = Selector('#password')
		await t.typeText(usernameInput, 'invalid username', { paste: true })
		await t.typeText(passwordInput, 'invalid password', { paste: true })

		const submitButton = Selector('#login-button')
		await t.click(submitButton)

		const errorMessage = Selector('.error-message-container h3').innerText
		await t
			.expect(errorMessage)
			.contains(
				'Epic sadface: Username and password do not match any user in this service'
			)
	}
)

// Login with valid credentials
test.timeouts({ pageLoadTimeout: 6000 })(
	'User can login with valid credentials',
	async t => {
		const usernameInput = Selector('#user-name')
		const passwordInput = Selector('#password')
		await t.typeText(usernameInput, 'standard_user', { paste: true })
		await t.typeText(passwordInput, 'secret_sauce', { paste: true })

		const submitButton = Selector('#login-button')
		await t.click(submitButton)

		const accountLogo = Selector('.app_logo')
		await t.expect(accountLogo.exists).ok() // Account logo after should exist
		await t.expect(submitButton.exists).notOk() // Submit button from login should not exist

		const logOutButton = Selector('#logout_sidebar_link')
		await t.expect(logOutButton.exists).ok() // Logout button should exist

		const expandMenuButton = Selector('#react-burger-menu-btn')
		await t.click(expandMenuButton)
		await t.click(logOutButton)
		await t.expect(submitButton.exists).ok() // Submit button should exist
	}
)
