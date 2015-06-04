Accounts.onCreateUser(function(options, user){
  user.adminGrade = 0;
  user.branchId = 10;
  user.testField = "TestField";
  
  console.log(user);
  console.log(options);
	return user;
});
