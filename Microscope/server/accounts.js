Accounts.onCreateUser(function(options, user){
  user.admin = 0;
  console.log(user);
  console.log(options);
	return user;
});
