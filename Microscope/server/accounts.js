Accounts.onCreateUser(function(options, user){
  user.admin = false;
  console.log(user);
  console.log(options);
	return user
});
