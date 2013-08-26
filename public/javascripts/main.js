function test(com, grid) {
			if (com == 'Delete') {
				confirm('Delete  some ' + $('.trSelected', grid).length + ' items?')
			} else if (com == 'Add') {
				alert('Add some New Item');
			}
		}




$(function() {
$( "#dialog-confirm" ).dialog({
resizable: false,
height:200,
width:400,
modal: true,
buttons: {
Login: function() {
document.login_form.submit();
},
Cancel: function() {
$( this ).dialog( "close" );
}
}
});
				});






