using AutoMapper;
using BelakorGamesAPI.Infrastructure.Classes;
using BelakorGamesAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class ProductoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private ProductoService ps;
        public ProductoController(IMapper mapper)
        {
            _mapper = mapper;
            ps = new ProductoService(_mapper);
            
        }
        [HttpGet]
        public List<ViewModelProducto> GetAll()
        {
            return ps.GetAll();

        }

        [HttpGet("{nombreJuego}")]        
        public ViewModelProducto GetByName(string nombreJuego)
        {           
              
            return ps.GetByName(nombreJuego);            
            
        }

        [HttpPost]
        public ViewModelProducto Add(ViewModelProducto prod)
        {

            return ps.Add(prod);            
        }
        [HttpPut("{nombreJuego}")]
        public ViewModelProducto ResponseUpadateProducto(ViewModelProducto viewModelProd)
        {
            return ps.UpadateProducto(viewModelProd);
        }       


    }
}
