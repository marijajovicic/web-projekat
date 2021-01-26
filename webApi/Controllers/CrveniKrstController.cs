using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Models;

namespace webApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CrveniKrstController : ControllerBase
    {
        private CrveniKrstContext db;

        public CrveniKrstController(CrveniKrstContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("VratiGradove")]
        public async Task<IList<Grad>> VratiGradove()
        {
            IList<Grad> gradovi = await db.Gradovi.Include(g => g.NizTimova).Include(g => g.NizVolontera).ToListAsync();
            return gradovi;
        }

        [Route("NapraviGrad")]
        [HttpPost]
        public async Task<Grad> NapraviGrad([FromBody] Grad grad)
        {
            if (string.IsNullOrEmpty(grad.Ime))
                return null;

            Tim prvaPomoc = new Tim();
            prvaPomoc.Ime = "Prva Pomoc";
            prvaPomoc.MojGrad = grad;
            prvaPomoc.MaxBrojVolontera = 7;

            db.Timovi.Add(prvaPomoc);
            db.Gradovi.Add(grad);

            await db.SaveChangesAsync();

            return grad;
        }

        [HttpPost]
        [Route("NapraviTim/{idGrada}")]
        public async Task NapraviTim(int idGrada, [FromBody] Tim tim)
        {
            Grad grad = await db.Gradovi.Where(g => g.Id == idGrada).FirstOrDefaultAsync();
            if (grad == null)
                return;

            tim.MojGrad = grad;
            db.Timovi.Add(tim);

            await db.SaveChangesAsync();
        }

        [HttpPost]
        [Route("NapraviVolontera/{idTima}")]
        public async Task<bool> NapraviVolontera(int idTima, [FromBody] Volonter volonter)
        {
            Tim tim = await db.Timovi.Where(t => t.Id == idTima).Include(t => t.MojGrad).FirstOrDefaultAsync();
            if (tim == null)
                return false;

            volonter.MojTim = tim;
            volonter.MojGrad = tim.MojGrad;
            db.Volonteri.Add(volonter);

            await db.SaveChangesAsync();

            return true;
        }

        [HttpPut]
        [Route("PromeniTimVolonteru/{idTima}/{idVolontera}")]
        public async Task<bool> PromeniTimVolonteru(int idTima, int idVolontera)
        {
            Tim tim = await db.Timovi.Where(t => t.Id == idTima).FirstOrDefaultAsync();
            if (tim == null)
                return false;

            Volonter volonter = await db.Volonteri.Where(vol => vol.Id == idVolontera).FirstOrDefaultAsync();
            if (volonter == null)
                return false;

            volonter.MojTim = tim;

            await db.SaveChangesAsync();

            return true;
        }

        [HttpDelete]
        [Route("ObrisiVolontera/{id}")]
        public async Task<bool> ObrisiVolontera(int id)
        {
            Volonter volonter = await db.Volonteri.Where(vol => vol.Id == id).FirstOrDefaultAsync();
            if (volonter == null)
                return false;

            db.Volonteri.Remove(volonter);

            await db.SaveChangesAsync();

            return true;
        }
    }
}