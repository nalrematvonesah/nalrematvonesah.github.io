
// Bootstrap-like validation
document.addEventListener('DOMContentLoaded', function(){
  const forms = document.querySelectorAll('form.needs-validation');
  forms.forEach(form => {
    form.addEventListener('submit', function(ev){
      if(!form.checkValidity()){
        ev.preventDefault();
        ev.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
});
