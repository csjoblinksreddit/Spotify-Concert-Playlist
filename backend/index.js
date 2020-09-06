/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

var client_id = 'c0de84ab300244c5b319bda9bcacb641'; // Your client id
var client_secret = 'a0500548f7644d0cb10a1d4d444b1858'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri


var jsonParser = bodyParser.json() // create application/json parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser

const mysql = require('mysql');
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-modify-public user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(access_token);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

app.post('/insert_artist', jsonParser, function(req, res) {
  try {
    const artist_name = req.body.artist_name
    if(artist_name) {
      res.sendStatus(200)
    }
    con.query(`SELECT ArtistName, ArtistCount FROM SearchedArtists WHERE ArtistName="${artist_name}";`, function(err, result) {
      if (err) throw err;
      if(result.length) { // if artist is searched before update count
        con.query(`UPDATE SearchedArtists SET ArtistCount=${result[0].ArtistCount + 1} WHERE ArtistName="${artist_name}";`)
      }
      else { // if it's the first query of artist's, insert 
        con.query(`INSERT INTO SearchedArtists (ArtistName, ArtistCount) VALUES ("${artist_name}", 1);`)
      }
    })
  } catch(err) {
    console.log(err)
  }
})

app.get('/get_artists', function(req, res) {
  try {
    con.query('SELECT `ArtistName`, `ArtistCount` FROM `SearchedArtists`', (err, result) => {
      res.send(result)
    })
  } catch (error) {
    res.send('Fetching most searched artists has failed')
  }
})

/*con.connect(function(err) {


  // Create the table if its not created yet
  // con.query('CREATE TABLE IF NOT EXISTS ZipCodes(id MEDIUMINT NOT NULL AUTO_INCREMENT, ZipCode MEDIUMINT , PRIMARY KEY(id));');
  
  // This is the name of our database. Have to tell mysql which database to use
  con.query('Use AfternoonTeam;');

    // This inserts a row in our table
  con.query('INSERT INTO SearchedArtists (ArtistName, ArtistCount) VALUES (1111, 1);',function(err,result){
      if (err) throw err;
      console.log(result);
  })

  // The name of our table is Zipcodes
  // This gets all rows from our table
  con.query('Select * from SearchedArtists;' ,function (err,result){
      if (err) throw err;
      console.log(result);
  });

  // Top ten most common zip codes
  let sql = 'SELECT artistName, count(*) FROM SearchedArtists GROUP BY artistName '+
  'ORDER BY count(*) DESC LIMIT 10;'

  con.query(sql,function(err,result){
      if (err) throw err;

      console.log(result);
  })

  con.end();
});*/



console.log('Listening on 8888');
app.listen(8888);
