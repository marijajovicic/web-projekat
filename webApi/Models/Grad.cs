using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace webApi.Models
{
    public class Grad
    {
        public Grad()
        {
            NizTimova = new List<Tim>();
            NizVolontera = new List<Volonter>();
        }

        [Required]
        public int Id { get; set; }
        [Required]
        public string Ime { get; set; }
        public IList<Tim> NizTimova { get; set; }
        public IList<Volonter> NizVolontera { get; set; }
    }
}