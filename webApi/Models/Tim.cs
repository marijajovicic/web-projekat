using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace webApi.Models
{
    public class Tim
    {
        public Tim()
        {
            NizVolontera = new List<Volonter>();
        }

        [Required]
        public int Id { get; set; }
        [Required]
        public string Ime { get; set; }
        [Required]
        public int MaxBrojVolontera { get; set; }

        public IList<Volonter> NizVolontera { get; set; }
        [JsonIgnore]
        public Grad MojGrad { get; set; }
    }
}