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
    public class ValoracionController
    {
        private readonly IMapper _mapper;
        private ValoracionService vs;
        public ValoracionController(IMapper mapper)
        {
            _mapper = mapper;
            vs = new ValoracionService(_mapper);

        }
        [HttpGet]
        public List<ViewModelValoracion> GetAll()
        {
            return vs.GetAll();

        }

        [HttpGet("{idProducto, idUsuario}")]
        public ViewModelValoracion GetByProductoYUsuario(int idProducto, int idUsuario)
        {
            return vs.GetByProductoYUsuario(idProducto, idUsuario);
        }

        [HttpPost]
        public ViewModelValoracion Add(ViewModelValoracion valoracion)
        {
            return vs.Add(valoracion);
        }

        [HttpPut("{idProducto, idUsuario}")]
        public ViewModelValoracion updateValoracion(ViewModelValoracion viewModelVal)
        {
            return vs.UpdateValoracion(viewModelVal);
        }


    }
}
