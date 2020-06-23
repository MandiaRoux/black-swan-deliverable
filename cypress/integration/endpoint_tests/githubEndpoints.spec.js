describe('Test Github Endpoints', () => {
	
	const endpointUrl = "https://api.github.com";
	const repositoryQuery = "styled-components";
	let repositoryFullName = "";
	
	/* The Tests */
	it('Get a repo by name', () => {
		cy.request({
			url: `${endpointUrl}/search/repositories?q=${repositoryQuery}`,
		})
			.should((response) => {
				expect(response.status)
					.to.eq(200)
				
			}).then((response) => {
			expect(response.body.items[0].name).to.eq(repositoryQuery)
			
			repositoryFullName = response.body.items[0].full_name
			assert.exists(repositoryFullName, 'repositoryFullName is not null')
		})
	})
	it('Get the issues of a given repo', () => {
		cy.request({
			url: `${endpointUrl}/search/issues?q=repo:${repositoryFullName}`,
		})
			.should((response) => {
				expect(response.status)
					.to.eq(200)
			})
	})
})
