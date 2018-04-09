const mongoose = require("mongoose");
const User = mongoose.model("User");
const Game = mongoose.model("Game");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secret = "ICryAlot";

module.exports = {

    create_user: function(req, res){
        var user = new User(req.body);
        user.save(function(err, user){
            if(err){
                console.log(err);
                res.json(err);
            } else {
                var token = jwt.sign({id:user._id}, secret, { expiresIn: '24h'})
                res.json({token:token});
            }
        })
    },

    one_user: function(req, res){
        var token = req.params.token
        if(token){
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({ user:false });
                } else {
                    User.findById(decoded.id).populate("games").exec(function(err, user){
                        if(err || !user){
                            res.json({ user:false })
                        } else {
                            user.password = null;
                            res.json({ user:user });
                        };
                    });
                };
            });
        };
    },

    logInUser: function(req, res){
        User.findOne({username:req.body.username}, function(err, user){
            // check for error or empty user return 
            if(err || !user){
                // log error to cosnole for development
                // send user id as false to instantiate error message on front end
                console.log(err);
                res.json({id:false});
            } else {
                // comapre the password entered with the previously hashed password savedin db
                bcrypt.compare(req.body.password, user.password, function(err, match){
                    if(err){
                        // log error to cosnole for development
                        // send user id as false to instantiate error message on front end
                        console.log(err);
                        res.json({id:false});
                    // check if match returns as true or false
                    } else if(match){
                        // if true will initiate session id
                        // send id as user id to log in user and allow access to app
                        var token = jwt.sign({id:user._id}, secret, { expiresIn: '24h'});
                        res.json({token: token});
                    }
                });
            };
        });
    },

    updateUser: function(req, res){
        if(req.params.token){
            jwt.verify(req.params.token, secret, function(err, decoded){
                if(err){
                    console.log(err);
                    res.json({user:false});
                } else {
                    User.findByIdAndUpdate(decoded.id, req.body, function(err, user){
                        if(err || !user){
                            console.log(err);
                            res.json({user:false});
                        } else {
                            res.json({user:user});
                        }
                    });
                };
            });
        };
    },

    create_game: function(req, res){
        var token = req.params.token;
        if(token){
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({ game:false });
                } else {
                    var game = new Game(req.body);
                    game._user = decoded.id;
                    game.save(function(err, game){
                        if(err){
                            console.log(err);
                            res.json({game:false});
                        } else {
                            User.findByIdAndUpdate(decoded.id, {$push: {games: game}}, function(err, user){
                                if(err){
                                    console.log(err)
                                    res.json({game:false})
                                } else {
                                    res.json({game:true});
                                }
                            })
                        }
                    })
                };
            });
        } else {
            res.redirect("/");
        }
    },

    all_games(req, res){
        Game.find({}, function(err, games){
            if(err || !games){
                res.json({games:false})
            } else {
                res.json({games:games});
            };
        });
    }
};