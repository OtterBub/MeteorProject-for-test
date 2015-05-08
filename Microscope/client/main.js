var person = { firstname:"Park", lastname:"sung-kyoung", fullname: function() { return this.firstname + ' ' + this.lastname; } };

console.log( person.fullname() );