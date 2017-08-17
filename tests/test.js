
var passport = require('passport');
var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();

describe('get posts', function() {
    it('posts exists test', function(done) {
        app.use(passport.initialize());
        app.use(passport.session());
        app.get('/posts', function(req, res){
            req.posts = {};
            if (!req.posts){
                return res.send(404);
            }
            res.send(200);
        });
        request(app).get('/posts').expect(200).end(done);
    });
    it('posts not found test', function(done) {
        app.use(passport.initialize());
        app.use(passport.session());
        app.get('/posts', function(req, res){
            if (!req.posts){
                return res.send(404);
            }
            res.send(200);
        });
        request(app).get('/posts').expect(404).end(done);
    });
    it('200 home page test', function(done) {
        app.use(passport.initialize());
        app.use(passport.session());
        app.get('/', function(req, res){
            req.user = {};
            if (!req.user){
                return res.send(403);
            }
            res.send(200);
        });
        request(app).get('/').expect(200).end(done);
    })
});