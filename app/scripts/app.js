require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
		socketio: '../node_modules/socket.io'
    }
});

function fun1() {
    //document.body.addEventListener('touchstart', function() {}, false);

      var socket  = io.connect('http://localhost:3000');
        
      $('#save').click(function() {
        if ($('#username_name').val() == '') {
          return alert('Please enter both name/salary!');
        }
        var data = {
          name: $('#usernames_name').val()
        };
        socket.emit('add username', data);
        $('#username_name').val('');
      });

      socket.on('populate', function(data) {
        var out = "";
        $.each(data, function(i, obj) {
          out += "<li>"+obj.name+"</li>";
        });
        $('#usernames').html(out);
      });

	}

/**
	iOS actually scales the window when you change orientation to landscape,
	so to overcome this you need to fix the scale factor and we release it
	as soon as a gesture is started.
**/
function fun2 () {
   
}

require(['app-control'], function (appcontrol) {
    'use strict';

    fun1();

    fun2();
});
