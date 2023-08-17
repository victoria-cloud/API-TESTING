const axios = require('axios')
const assert = require('chai').assert
const expect = require('chai').expect
const randomstring = require("randomstring");

const baseUrl = 'http://host.docker.internal:8080/api'
const projectName = 'default_personal'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyNjQ5ODIsInVzZXJfbmFtZSI6ImRlZmF1bHQiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiZDc4MDljN2UtODRhMC00NmU4LWIyMGMtYjIxZjA0OGNjYTRmIiwiY2xpZW50X2lkIjoidWkiLCJzY29wZSI6WyJ1aSJdfQ.gdUCAdxDzJZ2UXSreo-bPaFm_JrW2g4kbThkXyWKKSA"

const testObject = {
    description: '123',
    owner: 'default',
    share: false,
    id: 1,
    name: '123',
    widgets: []
}
const newDashboard = {
    "description": "dashboardCreatedByAPI_test",
    "name": randomstring.generate(7),
    "share": true
}

const header = {
    headers: {
        'Authorization': `bearer ${token}`
    }
}

let lastCreatedDashboardID

describe("RP's API testing: ", function () {

    it('GET dashboard by name should return certain dashboard info', async () => {
        let response = await axios.get(`${baseUrl}/v1/${projectName}/dashboard`, header)
        expect(response.status).to.equal(200)
        expect(response.data.content[0]).to.deep.equal(testObject)
    })

    it('POST shoult create new dashboard and return id', async () => {
        let response = await axios.post(`${baseUrl}/v1/${projectName}/dashboard`,
            newDashboard,
            header
        )
        lastCreatedDashboardID = response.data.id
        expect(response.status).to.equal(201)
        expect(response.data).to.have.property('id')
    })

    it('PUT update dashboard by id and return success message', async () => {

        let response = await axios.put(`${baseUrl}/v1/${projectName}/dashboard/${lastCreatedDashboardID}`,
            {
                "description": "UPDATED",
                "name": randomstring.generate(7),
                "share": true,
                "updateWidgets": []
            },
            header
        )
        console.log(response.data)
        expect(response.status).to.equal(200)
        expect(response.data).to.have.property('message').equal(`Dashboard with ID = '${lastCreatedDashboardID}' successfully updated`)
    })

    it('DELETE should delete dashboard by name and return success message', async () => {
        let response = await axios.delete(`${baseUrl}/v1/${projectName}/dashboard/${lastCreatedDashboardID}`, header)
        console.log(response.data)
        expect(response.status).to.equal(200)
        expect(response.data).to.have.property('message').equal(`Dashboard with ID = '${lastCreatedDashboardID}' successfully deleted.`)
    })

})



