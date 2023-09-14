import Swal from 'sweetalert2';
export const  showSuccessAlert=(message)=>{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
        width: '350px',
        heightAuto: false, 
      })
}
export const  showErrorAlert=(message)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: message,
        timer: 1500,
        width: '350px',
        heightAuto: false, 
      })
}