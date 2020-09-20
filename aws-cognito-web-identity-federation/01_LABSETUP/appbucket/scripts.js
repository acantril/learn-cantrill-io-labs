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

// A utility function to create HTML.
function getHtml(template) {
  return template.join('\n');
}

function signInCallback(authResult) {
  if (authResult['access_token']) {
    
    // adding google access token to Cognito credentials login map
    AWS.config.region = 'us-east-1'; 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', // MAKE SURE YOU REPLACE THIS
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
  
  var s3 = new AWS.S3();
  var params = {
    Bucket: "REPLACE_ME_PRIVATE_PATCHES_BUCKET" // MAKE SURE YOU REPLACE THIS
  }; 

  s3.listObjects(params, function(err, data) {

    if (err) {
      document.getElementById('output').innerHTML = "<b>YOU ARE NOT AUTHORISED TO QUERY AWS!</b>";
      console.log(err, err.stack);
    } else {
      console.log('AWS response:');
      console.log(data);
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + data.Name + '/';
      var photos = data.Contents.map(function(photo) {
        var photoKey = photo.Key;

        var url = s3.getSignedUrl ('getObject', {
          Bucket: data.Name,
          Key: photoKey
        })

        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return getHtml([
          '<span>',
            '<div>',
              '<br/>',
              '<a href="' + url + '" target="_blank"><img style="width:224px;height:224px;" src="' + url + '"/></a>',
            '</div>',
            '<div>',
              '<span>',
              '</span>',
            '</div>',
          '</span>',
        ]);
      });

      var htmlTemplate = [ '<div>',   getHtml(photos), '</div>']
      document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
    }    

  });
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  AWS.config.credentials.clearCachedId();
  document.getElementById('output').innerHTML = "";
  document.getElementById('viewer').innerHTML = "";
}