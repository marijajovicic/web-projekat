using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace webApi.Models
{
    public class Volonter
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Ime { get; set; }
        [Required]
        public string Prezime { get; set; }

        [JsonIgnore]
        public Tim MojTim { get; set; }

        [JsonIgnore]
        public Grad MojGrad { get; set; }
    }
}