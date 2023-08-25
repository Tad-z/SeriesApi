const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Series API', () => {
    describe('GET /series', () => {
        it('should return all the series', async () => {
            try {
                const res = await chai.request(app).get('/series');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.equal('Series retrieved successfully');
                expect(res.body.result).to.have.property('series').to.be.an('array');
            } catch (error) {
                throw error;
            }

        }).timeout(10000);
    })

    describe('GET /sortedSeries/?genre={option}', () => {
        it('should return all series with genre action', async () => {
            try {
                const res = await chai.request(app).get('/sortedSeries?genre=action');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.equal('Series retrieved successfully');
                expect(res.body.seriesByGenre).to.be.an('array');
            } catch (error) {
                throw error;
            }

        }).timeout(10000);

        it('should handle missing genre parameter', async () => {
            try {
                const response = await chai
                    .request(app)
                    .get('/sortedSeries'); 

                expect(response).to.have.status(400);
                expect(response.body.message).to.equal('Genre name not specified');
            } catch (error) {
                throw error;
            }

        }).timeout(10000);
    })

    describe('GET /sortedSeries/status?status={option}', () => {
        it('should return all series with status ongoing', async () => {
            try {
                const res = await chai.request(app).get('/sortedSeries/status?status=ongoing');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.equal('Series retrieved successfully');
                expect(res.body.seriesByStatus).to.be.an('array');
            } catch (error) {
                throw error;
            }

        }).timeout(10000);

        it('should handle missing status parameter', async () => {
            try {
                const response = await chai
                    .request(app)
                    .get('/sortedSeries/status'); 

                expect(response).to.have.status(400);
                expect(response.body.message).to.equal('Status not specified');
            } catch (error) {
                throw error;
            }

        }).timeout(10000);
    })
});

