function onSignIn(googleUser) {
  // profile info
  var profile = googleUser.getBasicProfile();
  console.log('Full Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());
  // auth response
  console.log('Google authentication response:');
  var authResponse = googleUser.getAuthResponse()
  console.log(authResponse);
  var id_token = authResponse.id_token;
  console.log('JWT token (encrypted): ' + id_token);
  console.log('JWT token (decrypted):');
  console.log(parseJwt(id_token));
  signInCallback(authResponse);
}

function signInCallback(authResult) {
  if (authResult['access_token']) {
    
    // adding google access token to Cognito credentials login map
    AWS.config.region = 'XX-XXXX-X';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      Logins: {
        'accounts.google.com': authResult['id_token']
      }
    });

    // obtain credentials
    AWS.config.credentials.get(function(err) {
      if (!err) {
        console.log('Cognito Identity Id: ' + AWS.config.credentials.identityId);
        // test aws
        testAWS();
      } else {
        document.getElementById('output').innerHTML = "<b>YOU ARE NOT AUTHORISED TO QUERY AWS!</b>";
        console.log('ERROR: ' + err);
      }
    });

  } else {
    console.log('User not logged in!');
  }
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  var plain_token = JSON.parse(window.atob(base64));
  return plain_token;
};

function testAWS() {
  var ec2 = new AWS.EC2();
  var params = {}; // all the things
  ec2.describeSecurityGroups(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log('AWS response:');
             console.log(data);
             document.getElementById('output').innerHTML = '<pre>'+JSON.stringify(data, null, 2)+'<pre>';
  });
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  AWS.config.credentials.clearCachedId();
  document.getElementById('output').innerHTML = "";
}