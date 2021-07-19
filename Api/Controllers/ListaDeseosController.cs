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
    public class ListaDeseosController: ControllerBase
    {
        private readonly IMapper _mapper;
        private ListaDeseosService lds;
        public ListaDeseosController(IMapper mapper)
        {
            _mapper = mapper;
            lds = new ListaDeseosService(_mapper);

        }

        [HttpGet]
        public List<ViewModelListaDeseos> GetAll()
        {
            return lds.GetAll();

        }
        [HttpGet("{idProducto, idUsuario}")]
        public ViewModelListaDeseos GetByProductoYUsuario(int idProducto, int idUsuario)
        {
            return lds.GetByProductoYUsuario(idProducto, idUsuario);
        }

        [HttpPost]
        public ViewModelListaDeseos Add(ViewModelListaDeseos deseos)
        {
            return lds.Add(deseos);
        }

        [HttpDelete("{idUsuario, idProducto}")]
        public bool Delete(int idUsuario, int idProducto)
        {
            return lds.delete(idUsuario, idProducto);
        }

    }
}
