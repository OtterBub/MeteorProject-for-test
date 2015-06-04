Accounts.onCreateUser(function(options, user){
  user.adminGrade = 0;
  user.branchId = 10;
  
  console.log(user);
  console.log(options);
	return user;
});
