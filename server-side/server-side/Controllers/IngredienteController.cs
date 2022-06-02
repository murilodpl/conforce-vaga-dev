using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server_side.Models;
using server_side.Data;

namespace server_side.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class IngredienteController : ControllerBase
    {
        private readonly ApiContext _context;

        public IngredienteController(ApiContext context)
        {
            _context = context;
        }

        // Get All
        [HttpGet]
        public JsonResult GetAll()
        {
            var result = _context.Ingredientes.ToList();

            return new JsonResult(Ok(result));
        }

        // Get By Id
        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.Ingredientes.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result));
        }

        // Create/Edit
        [HttpPost]
        public JsonResult CreateEdit(Ingrediente ingrediente)
        {
            if(ingrediente.Id == 0)
            {
                _context.Ingredientes.Add(ingrediente);
            } 
            else
            {
                var ingredienteInDb = _context.Ingredientes.Find(ingrediente.Id);

                if (ingredienteInDb == null)
                    return new JsonResult(NotFound());

                _context.Entry(ingredienteInDb).CurrentValues.SetValues(ingrediente);
            }

            _context.SaveChanges();

            return new JsonResult(Ok(ingrediente));
        }

        // Delete
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var result = _context.Ingredientes.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            _context.Ingredientes.Remove(result);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }
    }
}
