var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');
var bcrypt = require('bcrypt');

module.exports = {

  newAccount: function(data) {
    var hash = bcrypt.hashSync(data.password, 8);
    return users.insert({username: data.username,
                  password: hash});
  },

  login: function(data, res, req) {
    return users.findOne({username: data.username}, function(err, dbdata){
      if(dbdata)
      var crypt = bcrypt.compareSync(data.password, dbdata.password);
        if(crypt) {
          req.session.username = req.body.username;
        res.redirect('/');
      } else {
          var errors = [];
          errors.push("Unable to find username/password combination");
          res.render('funfinder/login', {errors: errors});
        }
  });
  }
};
