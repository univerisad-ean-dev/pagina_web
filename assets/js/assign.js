$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function rest(){
        $("#name").val('')
        $("#cc").val('')
        $("#email").val('')
        $("#type_order_id").val(0)
        $("#date").val('')
        $("#city_id").val(0)
        $("#payment_method").val(0)
        $("#pet_type_id").val(0)

}

$("#type_order_id").change(function(){
    const value = $("#type_order_id").val()
    let total =0;
   if ( value != 0) { 
      if (value == 2) {
        total = 300000
      } else if( value == 3 ) {
        total = 100000
      } 
      $("#value_one").val(total)
      $("#value_two").val(total)
   }

  });

function validate(){

    if($("#name").val() == ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el nombre es oligatorio!',
        })
        return false

    }
    if($("#cc").val()==''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la Cedula es oligatoria !',
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

    if($("#type_order_id").val()=='0'){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el Tipo de servicio es oligatorio !',
        })
        return false
    }
    if($("#date").val()==''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la fecha es oligatoria !',
        })
        return false
    }
    if($("#city_id").val()=='0'){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'la sede es oligatoria !',
        })
        return false
    }
    if($("#payment_method").val()=='0'){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el medio de pago  es oligatorio !',
        })
        return false
    }
    if($("#pet_type_id").val()=='0'){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el tipo de mascota es oligatorio !',
        })
        return false
    }
    if(!document.getElementById('checkbox').checked ){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'debe aceptar las politicas  !',
        })
        return false
    }
   

    return true;
}

$(".create").click(function(e){
    e.preventDefault();

    if(validate()){

        const data={
            'name':$("#name").val(),
            'cc':$("#cc").val(),
            'email':$("#email").val(),
            'type_order_id':$("#type_order_id").val(),
            'date':$("#date").val(),
            'city_id':$("#city_id").val(),
            'payment_method':$("#payment_method").val(),
            'pet_type_id':$("#pet_type_id").val(),
            'total':$("#value_one").val()
        };
        $.ajax({
            type:'POST',
            url:'http://127.0.0.1:8000/api/order',
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