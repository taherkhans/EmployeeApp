using System.ComponentModel.DataAnnotations;

namespace EmployeeApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8 , MinimumLength = 4, ErrorMessage = "you must supply password between 4 and 8 characters")]
        public string Password { get; set; }
    }
}