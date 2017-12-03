const User = require('./user.model');
const Post = require('../post/post.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports = {
  signup,
  login,
  logout,
  add,
  authenticate,
  update,
  del,
  show,
  showAll,
  showDashboard,
  thank
}

function signup(req, res, next) {
  res.render('signup');
}


function thank(req, res, next) {
  res.render('thank');
}

function login(req, res, next) {
  res.render('login');
};

function logout(req, res, next) {
  //clear the session
  req.session.destroy();
  res.redirect('/');
};

function add(req, res, next) {
  if(!req.body.username || !req.body.email || !req.body.password) {
    return res.render('signup', {err: 'Information incomplete'});
  }
 
  User.findOne({username: req.body.username}, function (err, usrData) {
    if (usrData === null) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          var user = new User();
          user.username = req.body.username;
          user.email = req.body.email;
          user.firstname = req.body.firstname;
          user.lastname = req.body.lastname;
          user.bio = req.body.description;
          user.userType = req.body.userType;
          if(user.userType == 'BUSINESS OWNER'){
            profilePermission = true
          }
          user.password = hash;
          user.save(function (err, user) {
            if (err) return res.status(404).send('signup', {error: err});
            req.session.user = user;
            res.redirect('/thank');
          });
        });
      });
    } else {
      res.render('signup', {error: 'User already exists'});
    }
  });

}

function authenticate(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.render('login', {error: 'Please enter your username and password.'});
  }
  User.findOne({username:req.body.username}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.render('login', {error: 'Incorrect email and password combination'});
    bcrypt.compare(req.body.password, user.password, function (err, authorized) {
      if (!authorized) {
        return res.render('login', {error: 'Incorrect email and password combination'});
      } else {
        req.session.user = user;
        req.session.admin = user.admin
        res.redirect('/');
      }
    });

  });
};

function update(req, res, next) {
  //console.log('req.body.email', req.body.email);
  User.findOne({username: req.session.user.username}, function (err, user) {
    if (err) return res.render('error', {error: 'oops! something went wrong'});
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.description) {
      user.bio = req.body.description;
    }

if (req.body.position) {
      user.position = req.body.position;
    }

    if (req.body.publication) {
      user.publication = req.body.publication;
    }

     if (req.body.linkedin) {
      user.linkedin = req.body.linkedin;
    }

    if (req.body.homepage) {
      user.homepage = req.body.homepage;
    }
    if(req.body.permissionType)
    {
      user.profilePermission = req.body.permissionType;
    }

    user.save(function(err) {
      if (err) return res.send(err);
      req.session.user = user;
      res.redirect('/dashboard');
    });
  });
}

function del(req, res, next) {
  if (!req.params.user) return next(new Error('No user ID.'));
  User.remove({username: req.params.user}, function (err, user) {
    if(!user) return next(new Error('user not found'));
    if (err) return next(err);
    req.session.destroy();
    res.redirect('/');
  });
}

function show(req, res, next) {
  if (!req.params.user) return res.send(404);
  User.findOne({username: req.params.user}, function (err, profile) {
    if (err) return next(err);
    if(!profile) return res.sendStatus(404);
    Post.find({'author.username': profile.username}, null, {sort: {created_at: -1}}, function (err, posts) {
      if (err) return next(err);
      res.render('profile', {user: req.session.user, profile: profile, posts: posts});
    });
  });
}

function showAll(req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.render('userlist', {user: req.session.user, users: users})
  });
}

function showDashboard(req, res, next) {
	User.findOne({email:req.session.user.email}, function(err, user) {
    	if (err) return next(err);
    	res.render('dashboard', {user: user});
    	//res.send({user:req.session.user.name});
  });
}
