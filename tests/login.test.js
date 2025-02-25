import { Selector } from 'testcafe'

//prettier-ignore
fixture `Login Test`
    .page `https://www.saucedemo.com`;

// Login with invalid credentials
test.timeouts({ pageLoadTimeout: 60000 })(
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
