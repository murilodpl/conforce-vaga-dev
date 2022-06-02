using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server_side.Models;
using server_side.Data;

namespace server_side.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LancheController : ControllerBase
    {
        private readonly ApiContext _context;

        public LancheController(ApiContext context)
        {
            _context = context;
        }

        // Get All
        [HttpGet]
        public JsonResult GetAll()
        {
            var result = _context.Lanches.ToList();

            return new JsonResult(Ok(result));
        }

        // Get By Id
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.Lanches.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Create/Edit
        [HttpPost]
        public JsonResult CreateEdit(Lanche lanche)
        {
            if(lanche.Id == 0)
            {
                _context.Lanches.Add(lanche);
            } 
            else
            {
                var lancheInDb = _context.Lanches.Find(lanche.Id);

                if (lancheInDb == null)
                    return new JsonResult(NotFound());

                _context.Entry(lancheInDb).CurrentValues.SetValues(lanche);
            }

            _context.SaveChanges();

            return new JsonResult(Ok(lanche));
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.Lanches.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.Lanches.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }
    }
}
