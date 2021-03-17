let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../../../app');
var expect = require('chai').expect;
var assert = require('assert');
let movie_name = ''
const data = require('./data')
let should = chai.should();

describe('ADD movie', () => {
    describe('/Create new movie', () => {
        it('it should create new movie', (done) => {
            chai.request(server)
                .post('/api/v1/movie')
                .send(data.movie)
                .end((err, res) => {
                    movie_name = res.body.object.name;
                    res.should.have.property('statusCode').equal(200);
                    expect(res.body.object).to.be.an('object');
                    done();
                });
        });
    });
});


describe('ADD movies', () => {
    describe('/Create new movies', () => {
        it('it should create new movie', (done) => {
            chai.request(server)
                .post('/api/v1/movies')
                .send(data.movies)
                .end((err, res) => {
                    res.should.have.property('statusCode').equal(200);
                    done();
                });
        });
    });
});

describe('Get Movie', () => {
    describe('/GET Movie by ID', () => {
        it('it should GET all the Movies', (done) => {
            chai.request(server)
                .get('/api/v1/movies?query='+ movie_name)
                .end((err, res) => {
                    res.should.have.property('statusCode').equal(200);
                    expect(res.body.object).to.be.an('array');
                    done();
                });
        });
        it('it should GET empty response when invalid search key is provided', (done) => {
            chai.request(server)
                .get('/api/v1/movies?query=fdsfdsfsdf')
                .end((err, res) => {
                    res.should.have.property('statusCode').equal(200);
                    expect(res.body.object).to.be.an('array');
                    done();
                });
        });
    });
});
