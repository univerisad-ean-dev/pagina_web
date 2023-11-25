$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function rest(){
        $("#amount").val('')
        $("#name").val('')
        $("#email").val('')
        $("#city_id").val(0)
}

 

function validate(){

    if($("#amount").val() == ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el valor a donar es oligatorio!',
        })
        return false

    }
  
    if($("#name").val() == ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el nombre es oligatorio!',
        })
        return false

    }

    if($("#email").val()==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el email  es oligatorio!',
        })
        return false
    }

    var email = $("#email").val();
    var pattern = new RegExp(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    if(pattern.test(email) == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el email  no es valido!',
        })
        return false
    }

   
    if($("#city_id").val()=='0'){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el pais es oligatorio !',
        })
        return false
    }
   

    return true;
}

$(".donate").click(function(e){
    e.preventDefault();

    if(validate()){

        const data={
           'amount': $("#amount").val(),
           'name': $("#name").val(),
           'email': $("#email").val(),
           'city_id': $("#city_id").val(),
           'payment_method':3
        };
        $.ajax({
            type:'POST',
            url:'http://127.0.0.1:8000/api/dotation',
            data:data,
            success:function(data){
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Registro Creado',
                })
                location.reload();
            },
            error:function(data){

                if (data.status == 422) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.responseJSON.message,
                    })
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'servidor sin conexion !',
                    })
                }
            }
        });
    }



});