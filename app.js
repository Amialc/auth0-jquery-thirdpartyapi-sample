$(document).ready(function() {
  var lock = new Auth0Lock(
    'BUIJSW9x60sIHBw8Kd9EmCbj8eDIFxDC',
    'samples.auth0.com');

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.show(function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback

          lock.getClient().getDelegationToken({id_token: token},
            function(err, thirdPartyApiToken) {
              if(err)
              console.log(err);
              else localStorage.setItem('thirdPartyApiToken', thirdPartyApiToken.id_token);
            });

          // Save the JWT token.
          localStorage.setItem('userToken', token);

          // Save the profile
          userProfile = profile;

          $('.login-box').hide();
          $('.logged-in-box').show();
          $('.nickname').text(profile.nickname);
        }
      });
    });


    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });

    $('.btn-api').click(function(e) {
        // Just call your API here. The header will be sent
    })


});
